// Express server for leaderboard CSV API
const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');

const app = express();
const PORT = 4000;
const CSV_PATH = path.join(__dirname, 'leaderboard.csv');

app.use(cors());
app.use(express.json());

// Read leaderboard from CSV
app.get('/api/leaderboard', (req, res) => {
  const results = [];
  if (!fs.existsSync(CSV_PATH)) return res.json([]);
  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Sort by score descending
      results.sort((a, b) => Number(b.score) - Number(a.score));
      res.json(results);
    });
});

// Add/update player in leaderboard
app.post('/api/leaderboard', (req, res) => {
  const { username, score } = req.body;
  if (!username || typeof score !== 'number') return res.status(400).json({ error: 'Invalid data' });
  let results = [];
  if (fs.existsSync(CSV_PATH)) {
    const data = fs.readFileSync(CSV_PATH, 'utf8');
    data.split('\n').slice(1).forEach(line => {
      const [u, s] = line.split(',');
      if (u && s) results.push({ username: u, score: Number(s) });
    });
  }
  // Update or add
  const existing = results.find(p => p.username === username);
  if (existing) {
    if (score > existing.score) existing.score = score;
  } else {
    results.push({ username, score });
  }
  // Write to CSV
  const csvWriter = createCsvWriter({
    path: CSV_PATH,
    header: [
      { id: 'username', title: 'username' },
      { id: 'score', title: 'score' }
    ]
  });
  csvWriter.writeRecords(results).then(() => {
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Leaderboard API running on http://localhost:${PORT}`);
});
