import Dexie from 'dexie';

const db = new Dexie('UsersDashboardDB');

db.version(1).stores({
  users: '++id, name, email, userStatus, joinDate',
  transactions: '++id, userId, date, amount, status',
});

export default db;