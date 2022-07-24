// DEPENDENCIES
const express = require("express");
const path = require('path');
const db = require("./db/db.json");
const {v4: uuidv4} = require("uuid");
const fs = require("fs");


// Initiate express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


// Notes API GET route
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
})

// Notes API POST route
app.post("/api/notes", (req, res) => {

  fs.readFile("./db/db.json", (error, data) => {
    if(error) {
      throw error;
    }

    const {title, text} = req.body;
    const id = uuidv4();
    const newNote = {
      title: title,
      text: text,
      id: id
    };

    const parsedData = JSON.parse(data);
    parsedData.push(newNote);
    const newDB = JSON.stringify(parsedData);

    fs.writeFile("./db/db.json", newDB, (err) => {
      if(err) {
        console.error(err);
        throw err;
      } else {
        console.log("Successfully saved");
        res.send(newNote);
      }
    });
  });

});


// Notes API DELETE route
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile("./db/db.json", (error, data) => {
    if(error) {
      throw error;
    }

    const parsedData = JSON.parse(data);
    console.log(parsedData);
    const newData = parsedData.filter((note) => {return note.id !== id;});
    console.log(newData);
    const newDB = JSON.stringify(newData);

    fs.writeFile("./db/db.json", newDB, (err) => {
      if(err) {
        console.error(err);
        throw err;
      } else {
        console.log("Successfully deleted");
        res.send("Successfully deleted");
      }
    });
  });

})


// Notes GET route
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// Homepage GET route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
})

// Port listener
app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
})