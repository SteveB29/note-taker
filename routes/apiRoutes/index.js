const router = require('express').Router();

var notes = require('../../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

router.post('/notes', (req, res) => {
  const noteToAdd = req.body;
  noteToAdd.id = uuidv4();
  notes.push(noteToAdd);
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(notes, null, 2));
  res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
  const deleteNote = req.params.id;
  notes = notes.filter(note => note.id != deleteNote);
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(notes, null, 2));
  res.json(notes);
});

module.exports = router;