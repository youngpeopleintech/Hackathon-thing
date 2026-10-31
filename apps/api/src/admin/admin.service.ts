import { BadRequestException, Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { SupabaseService } from "../supabase/supabase.service";

const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 100;
const MAX_EXPORT_ROWS = 10_000;
const CHUNK_SIZE = 500;

const DATASETS = {
  registrations: { table: "registrations", sheet: "Registrations", file: "registrations" },
  "conference-waitlist": {
    table: "conference_waitlist",
    sheet: "Waitlist",
    file: "conference-waitlist",
  },
  "impact-report": {
    table: "impact_report_waitlist",
    sheet: "Impact report",
    file: "impact-report",
  },
} as const;

type DatasetKey = keyof typeof DATASETS;
type Row = Record<string, unknown>;

@Injectable()
export class AdminService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async list(dataset: string, pageRaw: number, pageSizeRaw: number) {
    const table = this.tableFor(dataset);
    const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? pageRaw : 1;
    const pageSize = Number.isFinite(pageSizeRaw)
      ? Math.min(MAX_PAGE_SIZE, Math.max(1, pageSizeRaw))
      : DEFAULT_PAGE_SIZE;

    let rangeFrom = (page - 1) * pageSize;
    let rangeTo = rangeFrom + pageSize - 1;
    const first = await this.queryPage(table, rangeFrom, rangeTo);
    if (first.error) {
      throw new BadRequestException(first.error);
    }

    let rows = first.data;
    const totalCount = first.count;
    const totalPages = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    let effectivePage = page;

    if (totalCount > 0 && page > totalPages) {
      effectivePage = totalPages;
      rangeFrom = (effectivePage - 1) * pageSize;
      rangeTo = rangeFrom + pageSize - 1;
      const retry = await this.queryPage(table, rangeFrom, rangeTo);
      if (retry.error) throw new BadRequestException(retry.error);
      rows = retry.data;
    }

    return {
      rows,
      page: effectivePage,
      pageSize,
      totalCount,
      totalPages,
      hasNextPage: effectivePage < totalPages,
      hasPreviousPage: effectivePage > 1,
      rangeStart: totalCount === 0 ? 0 : Math.min(rangeFrom + 1, totalCount),
      rangeEnd: totalCount === 0 ? 0 : Math.min(rangeFrom + rows.length, totalCount),
    };
  }

  async exportFile(dataset: string, formatRaw?: string) {
    const spec = this.specFor(dataset);
    const format = (formatRaw || "xlsx").toLowerCase();
    const rows = await this.fetchAll(spec.table);
    const aoa = [
      ["Name", "Email"],
      ...rows.map((row) => [displayName(row), displayEmail(row)]),
    ];
    const stamp = new Date().toISOString().slice(0, 10);

    if (format === "csv") {
      return {
        filename: `${spec.file}-export-${stamp}.csv`,
        contentType: "text/csv; charset=utf-8",
        body: Buffer.from(`\uFEFF${encodeCsv(aoa)}`, "utf8"),
      };
    }

    if (format !== "xlsx") {
      throw new BadRequestException('Invalid format. Use "xlsx" or "csv".');
    }

    const sheet = XLSX.utils.aoa_to_sheet(aoa);
    sheet["!cols"] = [{ wch: 36 }, { wch: 40 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, spec.sheet.slice(0, 31));
    const body = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;

    return {
      filename: `${spec.file}-export-${stamp}.xlsx`,
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      body,
    };
  }

  private specFor(dataset: string) {
    if (dataset in DATASETS) return DATASETS[dataset as DatasetKey];
    throw new BadRequestException("Unknown dataset");
  }

  private tableFor(dataset: string) {
    return this.specFor(dataset).table;
  }

  private async queryPage(table: string, from: number, to: number) {
    const supabase = this.supabaseService.getClient() as unknown as {
      from: (table: string) => {
        select: (columns: string, options?: { count: "exact" }) => {
          order: (column: string, options: { ascending: boolean }) => {
            range: (from: number, to: number) => Promise<{ data: Row[] | null; error: { message: string } | null; count: number | null }>;
          };
          range: (from: number, to: number) => Promise<{ data: Row[] | null; error: { message: string } | null; count: number | null }>;
        };
      };
    };
    const attempts = [
      () => supabase.from(table).select("*", { count: "exact" }).order("id", { ascending: true }).range(from, to),
      () =>
        supabase
          .from(table)
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to),
      () => supabase.from(table).select("*", { count: "exact" }).range(from, to),
    ];

    let lastError = "Failed to read table";
    for (const run of attempts) {
      const { data, error, count } = await run();
      if (!error) {
        return { data: (data ?? []) as Row[], count: count ?? 0, error: null as string | null };
      }
      lastError = error.message;
    }
    return { data: [] as Row[], count: 0, error: lastError };
  }

  private async fetchAll(table: string) {
    const supabase = this.supabaseService.getClient() as unknown as {
      from: (table: string) => {
        select: (columns: string, options?: { count: "exact" }) => {
          order: (column: string, options: { ascending: boolean }) => {
            range: (from: number, to: number) => Promise<{ data: Row[] | null; error: { message: string } | null; count: number | null }>;
          };
          range: (from: number, to: number) => Promise<{ data: Row[] | null; error: { message: string } | null; count: number | null }>;
        };
      };
    };
    const rows: Row[] = [];
    let offset = 0;

    while (offset < MAX_EXPORT_ROWS) {
      const take = Math.min(CHUNK_SIZE, MAX_EXPORT_ROWS - offset);
      const rangeTo = offset + take - 1;
      const attempts = [
        () => supabase.from(table).select("*").order("id", { ascending: true }).range(offset, rangeTo),
        () => supabase.from(table).select("*").order("created_at", { ascending: false }).range(offset, rangeTo),
        () => supabase.from(table).select("*").range(offset, rangeTo),
      ];

      let chunk: Row[] | null = null;
      let lastError = "Failed to export table";
      for (const run of attempts) {
        const { data, error } = await run();
        if (!error) {
          chunk = (data ?? []) as Row[];
          break;
        }
        lastError = error.message;
      }
      if (!chunk) throw new BadRequestException(lastError);
      if (chunk.length === 0) break;
      rows.push(...chunk);
      if (chunk.length < take) break;
      offset += chunk.length;
    }

    return rows;
  }
}

function trimString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text.length ? text : null;
}

function displayName(row: Row): string {
  for (const key of ["name", "full_name", "display_name", "fullname"]) {
    const found = trimString(row[key]);
    if (found) return found;
  }
  const combined = [trimString(row.first_name), trimString(row.last_name)].filter(Boolean).join(" ");
  if (combined) return combined;
  return "—";
}

function displayEmail(row: Row): string {
  for (const key of ["email", "email_address", "user_email", "contact_email"]) {
    const found = trimString(row[key]);
    if (found) return found;
  }
  return "—";
}

function encodeCsv(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          if (/[",\n]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
          return cell;
        })
        .join(","),
    )
    .join("\n");
}
