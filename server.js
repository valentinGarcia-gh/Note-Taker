// package dependencies 
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
let notes = require("./db/db.json");

// starts the server and listens to the PORT
app.listen(PORT, function(){
    console.log("Port listening on " + PORT);
});

// starts up express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// GET HTML requests 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) =>{
    const createNotes = req.body;
    notes.push(createNotes);
    fs.writeFile(path.join(__dirname,'./db/db.json'), JSON.stringify(notes), (err) => {
        if(err)throw err;
        res.json(notes);
    });
    // console.log("saved the note");
});

app.delete("/api/notes/:id", (res,req) => {
    notes = notes.filter(function (notes) {
        return notes.id != req.params.id;
    });
    fs.writeFile(path.join(__dirname,'./db/db.json'), JSON.stringify(notes), (err) => {
        if(err)throw err;
        res.json(notes);
    });
});