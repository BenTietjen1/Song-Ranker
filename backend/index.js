const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint to get all songs
app.get('/beatles', (req, res) => {
    fs.readFile('./beatles.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading song data.');
        } else {
            res.json(JSON.parse(data));
        }
        });
});

app.get('/correctBeatles', (req, res) => {
    fs.readFile('./correctBeatles.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading song data.');
        } else {
            res.json(JSON.parse(data));
        }
        });
});

app.get('/rakim', (req, res) => {
    fs.readFile('./rakim.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading song data.');
        } else {
            res.json(JSON.parse(data));
        }
        });
});

app.get('/correctRakim', (req, res) => {
    fs.readFile('./correctRakim.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading song data.');
        } else {
            res.json(JSON.parse(data));
        }
        });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Song Ranking API!');
  });
