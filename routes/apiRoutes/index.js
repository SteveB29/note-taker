const router = require('express').Router();

var notes = require('../../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// function to write current notes variable to db.json
// Not added to own file as only one function and new file not necessary at this point in development
function writeToDB(notes) {
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(notes, null, 2));
}

// get the current notes and sends back for notes section loading
router.get('/notes', (req, res) => {
  res.json(notes);
});

// is called when new note is saved. Adds new note to the notes variable, updates db.json, and responds with current notes
router.post('/notes', (req, res) => {
  const noteToAdd = req.body;
  noteToAdd.id = uuidv4();
  notes.push(noteToAdd);
  writeToDB(notes);
  res.json(notes);
});

// is called when a note is deleted. Filters deleted note from the notes variable, updates db.json, and responds with current notes
router.delete('/notes/:id', (req, res) => {
  const deleteNote = req.params.id;
  notes = notes.filter(note => note.id != deleteNote);
  writeToDB(notes);
  res.json(notes);
});

module.exports = router;