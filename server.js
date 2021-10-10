const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// makes all static files available on page load
app.use(express.static("public"));

const notes = require('./db/db.json')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const noteToAdd = req.body;
  noteToAdd.id = uuidv4();
  notes.push(noteToAdd);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes, null, 2));
  res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
  const deleteNote = req.params.id;
  console.log(deleteNote);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});