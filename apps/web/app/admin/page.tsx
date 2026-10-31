import type { Metadata } from 'next';
import { AdminPage } from '@/src/admin/AdminPage';

export const metadata: Metadata = {
  title: 'Registrations — YPIT AF',
};

export default function AdminRoute() {
  return <AdminPage />;
}
