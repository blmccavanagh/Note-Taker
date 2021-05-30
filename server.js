const express = require('express');
const path = require('path');
// calls an instance - an array of info
let db = require('./db/db.json')
const { nanoid } = require('nanoid');
const fs = require('fs');

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 8080;

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// express.static delivers public folder to user side for usage
app.use(express.static('public'));

// Name of the current directory
// C:\Users\mcclo\Documents\code\bootcamp-resources\homework\Note-Takerwork\Note-Taker
console.log(__dirname);

console.log(db);

// Direct user to the main page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, `./public/index.html`)));

// Direct user to the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, `./public/notes.html`)));

app.get('/api/notes', (req, res) => res.json(db));

//   app.post('/api/notes', async (req, res) => {
//     const postData = req.body;
//     const databaseData = await readDb();
//     dbData.push(postData);
//     await writeDb(databaseData);
//     res.end();
//   });

// when the user saves a note - saveNote from index.js
app.post('/api/notes', (req, res) => {
    // what the front end sends when this route is triggered
    // What did the front end give me?
    // req.body is going to be an object 
    console.log(req.body);
    let savedNotes = {
        id: nanoid(10),
        title: req.body.title,
        text: req.body.text
    };
    console.log(savedNotes);
    // pushing it to the db variable
    db.push(savedNotes);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            throw error;
        }
        res.json(savedNotes);
    });
})

app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    // db !== req.params.id;
    db = db.filter(note => note.id !== req.params.id);
    console.log(db);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            throw error;
        }
        // respond with status (200 is successful) then respond with the updated database
        res.status(200).json(db);
    });
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
//   });
// app.delete
// In the code under assets look at the js index
// you refer back to what it refers to in the front end stuff

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});