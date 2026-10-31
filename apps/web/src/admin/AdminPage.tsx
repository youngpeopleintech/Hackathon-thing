'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiUrl } from '@/lib/api';
import './admin.css';

type Dataset = 'registrations' | 'conference-waitlist' | 'impact-report';

type PageResult = {
  rows: Record<string, unknown>[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  rangeStart: number;
  rangeEnd: number;
};

const DATASETS: { id: Dataset; label: string }[] = [
  { id: 'registrations', label: 'Registrations' },
  { id: 'conference-waitlist', label: 'Conference waitlist' },
  { id: 'impact-report', label: 'Impact report' },
];

const AUTH_KEY = 'ypit-admin-basic';

function maskEmail(raw: string) {
  const value = raw.trim();
  const at = value.indexOf('@');
  if (at < 0) return value ? `${value[0]}***` : value;
  const local = value.slice(0, at);
  return `${local[0] ?? '*'}***@${value.slice(at + 1)}`;
}

function displayName(row: Record<string, unknown>) {
  const direct = row.full_name ?? row.name ?? row.display_name;
  if (typeof direct === 'string' && direct.trim()) return direct;
  return '—';
}

function displayEmail(row: Record<string, unknown>) {
  const email = row.email;
  return typeof email === 'string' && email.trim() ? email : '—';
}

function formatValue(key: string, value: unknown) {
  if (value === null || value === undefined || value === '') return '—';
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  return key.toLowerCase().includes('email') ? maskEmail(text) : text;
}

export function AdminPage() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState('');
  const [dataset, setDataset] = useState<Dataset>('registrations');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [data, setData] = useState<PageResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    setToken(sessionStorage.getItem(AUTH_KEY));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !token) return;
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch(apiUrl(`/admin/${dataset}?page=${page}&pageSize=${pageSize}`), {
      headers: { Authorization: `Basic ${token}` },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (response.status === 401) {
          sessionStorage.removeItem(AUTH_KEY);
          setAuthError('Those credentials were not accepted.');
          setToken(null);
          return;
        }
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(body.message || body.error || 'Could not load this table.');
        setData(body as PageResult);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setData(null);
        setError(err instanceof Error ? err.message : 'Could not load this table.');
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [ready, token, dataset, page, pageSize]);

  const detailEntries = useMemo(() => {
    if (!selected) return [];
    return Object.keys(selected)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => [key, selected[key]] as const);
  }, [selected]);

  async function download(format: 'csv' | 'xlsx') {
    if (!token) return;
    const response = await fetch(apiUrl(`/admin/${dataset}/export?format=${format}`), {
      headers: { Authorization: `Basic ${token}` },
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.message || 'Export failed.');
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const match = response.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/);
    link.href = url;
    link.download = match?.[1] || `${dataset}.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!ready) {
    return <div className="admin-app" />;
  }

  if (!token) {
    return (
      <div className="admin-app">
        <main className="admin-login">
          <p className="admin-kicker">YPIT · Internal</p>
          <h1>Registrations</h1>
          <p>Sign in with the admin username and password to read registrations and waitlists.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              const user = String(form.get('user') || '');
              const password = String(form.get('password') || '');
              const next = btoa(`${user}:${password}`);
              sessionStorage.setItem(AUTH_KEY, next);
              setAuthError('');
              setToken(next);
            }}
          >
            <label>
              Username
              <input name="user" autoComplete="username" required />
            </label>
            <label>
              Password
              <input name="password" type="password" autoComplete="current-password" required />
            </label>
            <button className="admin-button" type="submit">
              Sign in
            </button>
            {authError ? <p className="admin-error">{authError}</p> : null}
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-app">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">YPIT · Internal</p>
          <h1>Registrations</h1>
          <p>Read-only directories for hackathon registrations, the conference waitlist, and the impact-report list.</p>
        </div>
        <div>
          <a href="/">Public site</a>
          <button
            className="admin-text-button"
            type="button"
            onClick={() => {
              sessionStorage.removeItem(AUTH_KEY);
              setToken(null);
              setData(null);
            }}
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="admin-main">
        <div className="admin-tabs" role="tablist">
          {DATASETS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={dataset === item.id}
              onClick={() => {
                setDataset(item.id);
                setPage(1);
                setSelected(null);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="admin-toolbar">
          <p>{loading ? 'Loading…' : data ? `${data.totalCount} rows` : ''}</p>
          <div className="admin-export">
            <button type="button" onClick={() => download('csv')}>
              Export CSV
            </button>
            <button type="button" onClick={() => download('xlsx')}>
              Export Excel
            </button>
          </div>
        </div>
        {error ? <p className="admin-error">{error}</p> : null}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {(data?.rows ?? []).map((row, index) => (
                <tr key={String(row.id ?? index)} onClick={() => setSelected(row)}>
                  <td>{displayName(row)}</td>
                  <td>{maskEmail(displayEmail(row))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data && data.totalCount > 0 ? (
          <div className="admin-pager">
            <p>
              Showing {data.rangeStart}–{data.rangeEnd} of {data.totalCount}
            </p>
            <label>
              Per page{' '}
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
              >
                {[25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <button type="button" disabled={!data.hasPreviousPage} onClick={() => setPage((current) => current - 1)}>
                Previous
              </button>
              <button type="button" disabled={!data.hasNextPage} onClick={() => setPage((current) => current + 1)}>
                Next
              </button>
            </div>
          </div>
        ) : null}
      </main>
      {selected ? (
        <div className="admin-dialog" onClick={() => setSelected(null)}>
          <div onClick={(event) => event.stopPropagation()}>
            <h2>{displayName(selected)}</h2>
            <dl className="admin-detail">
              {detailEntries.map(([key, value]) => (
                <div key={key}>
                  <dt>{key.replaceAll('_', ' ')}</dt>
                  <dd>{formatValue(key, value)}</dd>
                </div>
              ))}
            </dl>
            <button className="admin-button" type="button" onClick={() => setSelected(null)}>
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
