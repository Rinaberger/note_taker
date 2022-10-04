const fs = require('fs');
const path = require('path');

//start express
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./db/note');
const { response } = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function createNewNote(body, noteArray) {
    const note = body;
    note.id = noteArray.length.toString();
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/note.json'),
        JSON.stringify({ notes: noteArray }, null, 2)
    );
    return note;
}

//retrieve note
app.get('/api/note', (req, res) => {
    res.json(notes);
});

app.get('/api/note/:id', (req, res) => {
    if (req.params?.id) {
        res.json(notes);
    }
    if (!req.params.id)
        res.status(400).send("ID not found on request body.")
})

//create note
app.post('/api/note', (req, res) => {
    
    const note = createNewNote(req.body, notes);
    res.json(note);
});


//getting server to listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});