const fb = require('express').Router();
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the note
fb.get('/', (req, res) => {
  console.info(`${req.method} request received for note`);

 readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting note
fb.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = fb;
