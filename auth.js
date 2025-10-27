const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';

export function signup({name, email, password}) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.some(u => u.email === email)) {
    throw new Error('A user with this email already exists.');
  }
  users.push({ name, email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token: 'mock-token-' + Date.now(), user: { name, email } }));
}

export function login({email, password}) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) throw new Error('Invalid email or password.');
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token: 'mock-token-' + Date.now(), user: { name: u.name, email: u.email } }));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  const s = localStorage.getItem(SESSION_KEY);
  return s ? JSON.parse(s) : null;
}
