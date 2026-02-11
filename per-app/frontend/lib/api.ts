import { nanoid } from 'nanoid';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5001';

export type SaveReportPayload<T> = {
  data: T;
  savedAt?: string;
};

export async function saveReport<T>(payload: SaveReportPayload<T>) {
  const id = nanoid();
  const res = await fetch(`${API_BASE}/form/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save report');
  return { id };
}

export async function loadReport(id: string) {
  const res = await fetch(`${API_BASE}/form/${id}`);
  if (!res.ok) throw new Error('Failed to load report');
  return res.json();
}
