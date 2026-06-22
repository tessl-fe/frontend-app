const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchJSON<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const api = {
  getMetrics: () => fetchJSON<{ activeUsers: number; tasksCompleted: number; teamVelocity: number }>('/metrics'),
  getTeamActivity: () => fetchJSON<{ date: string; commits: number; prs: number }[]>('/activity'),
  getUsers: () => fetchJSON<{ id: string; name: string; email: string; role: string }[]>('/users'),
};
