const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// makes all static files available on page load
app.use(express.static("public"));

app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

var notes = require('./db/db.json')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});