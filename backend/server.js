"use strict";

const express = require("express");
const morgan = require("morgan");

// any changes to the this data will persist only until the server restarts.
const projects = require("./data/projects.json");

const app = express();
// Below are methods that are included in express(). We chain them for convenience.
// --------------------------------------------------------------------------------
// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"));
app.use(express.json());

app.get("/api/projects", (req, res) => {
  res.status(200).json({ status: 200, projects });
});

// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

// Node spins up our server and sets it to listen on port 5.000.
app.listen(5000, () => console.log(`Listening on port 5000`));
