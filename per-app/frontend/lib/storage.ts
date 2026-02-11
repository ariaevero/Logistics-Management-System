const STORAGE_KEY = 'nn-per-206';

type DraftPayload<T> = {
  data: T;
  page: number;
  timestamp: string;
};

export function saveDraft<T>(data: T, page: number) {
  if (typeof window === 'undefined') return;
  const payload: DraftPayload<T> = {
    data,
    page,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadDraft<T>() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DraftPayload<T>;
  } catch (err) {
    console.error('Failed to parse draft', err);
    return null;
  }
}

export function clearDraft() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
