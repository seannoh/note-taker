// DEPENDENCIES
const express = require("express");
const path = require('path');
const db = require("./db/db.json")


// Initiate express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Notes GET route
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
})

// Homepage GET route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
})


// Notes API GET route


// Notes API POST route


// Notes API DELETE route


// Port listener
app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
})