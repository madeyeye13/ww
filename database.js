const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./comments.db');

// Create a comments table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = db;
