// Generate a unique localStorage key for each user's tickets
export function getKeyForUser(email) {
  return `ticketapp_${email}_tickets`;
}

// Get list of all tickets for a user
export function listTickets(email) {
  const key = getKeyForUser(email);
  return JSON.parse(localStorage.getItem(key) || '[]');
}

// Create or update a ticket
export function saveTicket(email, ticket) {
  const key = getKeyForUser(email);
  const list = JSON.parse(localStorage.getItem(key) || '[]');

  // If no ID yet, create a new ticket
  if (!ticket.id) {
    ticket.id = Date.now().toString();
    ticket.createdAt = new Date().toISOString();
  } else {
    ticket.updatedAt = new Date().toISOString();
  }

  // Validation
  if (!ticket.title) throw new Error('Title is required.');
  if (!['open', 'in_progress', 'closed'].includes(ticket.status)) {
    throw new Error('Status must be one of open, in_progress, or closed.');
  }

  // Save (add or update)
  const index = list.findIndex(t => t.id === ticket.id);
  if (index === -1) list.push(ticket);
  else list[index] = ticket;

  localStorage.setItem(key, JSON.stringify(list));
  return ticket;
}

// Delete a ticket
export function deleteTicket(email, id) {
  const key = getKeyForUser(email);
  const list = JSON.parse(localStorage.getItem(key) || '[]').filter(t => t.id !== id);
  localStorage.setItem(key, JSON.stringify(list));
}
