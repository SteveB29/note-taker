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

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  console.log(req.body);
  res.json(notes);
})

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});