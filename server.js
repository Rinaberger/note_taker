const fs = require('fs');
const path = require('path');

//start express
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./Develop/db/note');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function createNewNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/note.json'),
        JSON.stringify({ notes: noteArray }, null, 2)
    );
    return note;
}








//retrieve note
app.get('/api/note', (req, res) => {
    res.json(notes);
  });

//create note
app.post('/api/note', (req, res) => {
    req.body = notes.length.toString();
    const note = createNewNote(req.body, notes); 
    res.json(note);
}); 


//getting server to listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });