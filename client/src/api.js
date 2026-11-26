// src/api.js — small fetch wrapper that attaches the JWT and throws readable errors.
export async function api(path, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('token');

  const res = await fetch(`/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401 && token) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}