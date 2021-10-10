const router = require('express').Router();

var notes = require('../../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const writeToDB = (notes) => {
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(notes, null, 2));
}

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.post('/notes', (req, res) => {
  const noteToAdd = req.body;
  noteToAdd.id = uuidv4();
  notes.push(noteToAdd);
  writeToDB(notes);
  res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
  const deleteNote = req.params.id;
  notes = notes.filter(note => note.id != deleteNote);
  writeToDB(notes);
  res.json(notes);
});

module.exports = router;