import Dexie from "dexie";

const db = new Dexie("gallery-app");

db.version(1).stores({
  users: `++id, email, password`,
  images: `++id, userId`,
});

export default db;
