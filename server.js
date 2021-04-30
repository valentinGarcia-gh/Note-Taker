// package dependencies 
const express = require("express");
const fs = require("fs");
const path = require("path");
const $PORT = process.env.PORT || 8080;
const app = express();
// let notesdb = require("./db/db.json");

app.listen(8080, function(){
    console.log("Port listening")
});

// starts up express app
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET HTML requests 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.get("/valentin", function(req, res) {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    console.log("saved the note");
    res.json();
  });

app.post("/api/notes", (req, res) =>{
    const createNotes = req.body;
    fs.readFile("./public/assets/db.json")
})