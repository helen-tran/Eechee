"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const {
  addUser,
  getUsers,
  getUser,
  getProjects,
  getProject,
  deleteTask,
  getTasksUser,
  getTasksProject,
  signIn,
  addList,
  getTasks,
  addProject,
  getListsProject,
  addTask,
} = require("./handlers");
const PORT = process.env.PORT || 7500;
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // add new endpoints here
  // get all users
  .get("/users", getUsers)

  // get single user
  .get("/user/:id", getUser)

  // get all projects
  .get("/projects", getProjects)

  // get single project
  .get("/project/:_id", getProject)

  // add project
  .post("/project", addProject)

  // get all tasks
  .get("/tasks", getTasks)

  // get lists according to project
  .get("/lists/:projectId", getListsProject)

  //  add list
  .post("/lists", addList)

  // get tasks according to project
  .get("/tasksList/:listId", getTasksProject)

  // get tasks for user with id
  .get("/tasks/:userId", getTasksUser)

  // add task
  .post("/tasks", addTask)

  // delete tasks
  .delete("/task/:taskId", deleteTask)

  // login
  .post("/login", signIn)

  // sign up
  .post("/signUp", addUser)

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
