// DEPENDENCIES
const { urlencoded } = require("express");
const express = require("express");
const path = require('path');
const db = require("./db/db.json")


// Initiate express
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Notes GET route


// Homepage GET route


// Notes API GET route


// Notes API POST route


// Notes API DELETE route


// Port listener
app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
})