"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { addUser } = require("./handlers");
const PORT = process.env.PORT || 3000;
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  //  // adding reservation
  .post("/sign up", addUser)
  // add new endpoints here ☝️
  // getting flights

  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 3000.
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
