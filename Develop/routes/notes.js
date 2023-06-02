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
  if (req.body) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
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



fb.delete('/:id', (req, res) => {
  fs.readFile('./db/db.json', (err,notes) =>  {
    let parseNote = JSON.parse(notes); 
    let filterNotes = parseNote.filter(note => note.id !== req.params.id);
    fs.writeFile('./db/db.json', JSON.stringify(filterNotes), (err)=> {
      if (err) throw err;
      res.json(filterNotes)
    })
  })
});



module.exports = fb;



