const STORAGE_KEY = "truman_request_history";
const MAX_ITEMS = 15;

export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry) {
  const history = getHistory();
  const item = {
    id: Date.now(),
    ...entry,
  };

  // Avoid consecutive identical method + url + body duplicates
  const filtered = history.filter(
    (h) => !(h.method === item.method && h.url === item.url && h.body === item.body)
  );

  const updated = [item, ...filtered].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}