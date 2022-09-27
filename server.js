//start express
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./Develop/db/db');












//retrieve note
app.get('/api/db', (req, res) => {
    res.json(notes);
  });


//getting server to listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });