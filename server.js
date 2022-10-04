const fs = require('fs');
const path = require('path');

//start express
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./db/note');
const { response } = require('express');
const { dirname } = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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
//validation of Note Title
function validateNoteTitle(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    return true;    
}

//validation of Note Text
function validateNoteText(note) {
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;    
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

//create note w/ validation
app.post('/api/note', (req, res) => {
    if (!validateNoteTitle(req.body)) {
        res.status(400).send('The title must not be blank.')    
    } 
    else if (!validateNoteText(req.body)) {
        res.status(400).send('The note must have content.')    
    }
    else {
    const note = createNewNote(req.body, notes);
    res.json(note);
    }
});

//route to home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//route to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(--dirname, './public/index.html'));
});

//getting server to listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});