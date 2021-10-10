const router = require('express').Router();
const path = require('path');

// if page /notes is called, responds by sending notes.html
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// for all other page calls that are not defined, loads index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;