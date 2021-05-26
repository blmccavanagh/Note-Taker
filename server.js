const express = require('express');
const path = require('path');
let db = require('./db/db.json')
const generate = require('nanoid-generate');

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 8080;

// Name of the current directory
console.log(__dirname);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, `./public/notes.html`)));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));