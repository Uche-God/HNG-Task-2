const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';

// Signup function
export function signup({ name, email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.some(u => u.email === email)) {
    throw new Error('A user with this email already exists.');
  }
  users.push({ name, email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ token: 'mock-token-' + Date.now(), user: { name, email } })
  );
}

// Login function
export function login({ email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password.');
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ token: 'mock-token-' + Date.now(), user: { name: user.name, email: user.email } })
  );
}

// Logout function
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

// Get active session
export function getSession() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}
