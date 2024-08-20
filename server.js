const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for the frontend)
app.use(express.static('public'));

// Endpoint to get all comments
app.get('/comments', (req, res) => {
    db.all('SELECT * FROM comments ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ comments: rows });
    });
});

// Endpoint to post a new comment
app.post('/comments', (req, res) => {
    const { name, email, comment } = req.body;
    db.run(`INSERT INTO comments (name, email, comment) VALUES (?, ?, ?)`,
        [name, email, comment],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
