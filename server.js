// DEPENDENCIES
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Initiate express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Notes API GET route
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Notes API POST route
app.post("/api/notes", (req, res) => {

  // read in contents of db.json
  fs.readFile("./db/db.json", (error, data) => {
    if (error) {
      throw error;
    }

    // store contents of new note to an object, using uuidv4 to generate a new unique id
    const { title, text } = req.body;
    const id = uuidv4();
    const newNote = {
      title: title,
      text: text,
      id: id,
    };

    // parse the saved data, add the new note, and convert to string
    const parsedData = JSON.parse(data);
    parsedData.push(newNote);
    const newDB = JSON.stringify(parsedData);

    // write the new data to db.json
    fs.writeFile("./db/db.json", newDB, (err) => {
      if (err) {
        throw err;
      } else {
        res.send(newNote);
      }
    });
  });
});

// Notes API DELETE route
app.delete("/api/notes/:id", (req, res) => {
  // get id of note to be deleted from route parameter
  const id = req.params.id;

  // read in saved notes from db.json
  fs.readFile("./db/db.json", (error, data) => {
    if (error) {
      throw error;
    }

    // parse saved notes, filter out the specified note with the correct id, and convert to string
    const parsedData = JSON.parse(data);
    const newData = parsedData.filter((note) => {
      return note.id !== id;
    });
    const newDB = JSON.stringify(newData);

    // write the new data to db.json
    fs.writeFile("./db/db.json", newDB, (err) => {
      if (err) {
        throw err;
      } else {
        res.send("Successfully deleted");
      }
    });
  });
});

// Notes GET route
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Homepage GET route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Port listener
app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
});
