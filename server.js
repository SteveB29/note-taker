const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static("public"));

const notes = require('./db/db.json')

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
})

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});