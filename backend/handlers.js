"use strict";
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// GET ALL USERS  - works
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("eechee-data");

    const users = await db.collection("users").find().toArray();
    if (users) {
      return res
        .status(200)
        .json({ status: 200, message: "Users found!", data: users });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Users not found",
        data: users,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// GET SINGLE USER - works
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const userId = req.params.id;

    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    if (user) {
      return res
        .status(200)
        .json({ status: 200, message: "Found user!", data: user });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Didn't find the user",
        data: user,
      });
    }
  } finally {
    client.close();
  }
};

// GET ALL PROJECTS - works
const getProjects = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");

    const projects = await db.collection("projects").find().toArray();
    if (projects) {
      return res
        .status(200)
        .json({ status: 200, message: "Projects found!", data: projects });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Projects not found",
        data: projects,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// GET PROJECT - works
const getProject = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const projectId = req.params.id;

    const project = await db
      .collection("projects")
      .findOne({ _id: ObjectId(projectId) });
    if (project) {
      return res
        .status(200)
        .json({ status: 200, message: "Found project!", data: project });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Didn't find the project",
        data: project,
      });
    }
  } finally {
    client.close();
  }
};

// GET TASKS FOR USER WITH USER ID - fix this
const getTasksUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    const project = await db
      .collection("users")
      .findOne({ _id: ObjectId(projectId) });

    const tasks = project.tasks;

    const result = tasks.map((task) => {
      const assignees = task.assignees;
      console.log(assignees, "assignees");
      const match = assignees.find((assignee) => {
        assignee === userId;
      });
      //   match is returning undefined  - because some of the results are false therefore all is falses
      //   console.log(match, "match");
      if (match) {
        return task;
      }
    });

    if (result) {
      return res
        .status(200)
        .json({ status: 200, message: "Tasks for user found!", data: result });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Tasks for user not found",
        data: result,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// ADD TASKS - works
const addTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const projectId = req.params.projectId;
    const newTask = req.body;
    newTask._id = new ObjectId();
    const taskName = req.body.taskName;
    const dueDate = req.body.dueDate;
    const assignees = req.body.assignees;
    const description = req.body.description;
    const checklist = req.body.checklist;

    const db = client.db("eechee-data");
    const result = await db
      .collection("projects")
      .updateOne({ _id: ObjectId(projectId) }, { $push: { tasks: req.body } });

    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Task added.",
        data: newTask,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Can't create the task.",
        data: newTask,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// DELETE TASKS - works
const deleteTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    const project = await db
      .collection("projects")
      .updateOne(
        { _id: ObjectId(projectId) },
        { $pull: { tasks: { _id: ObjectId(taskId) } } }
      );

    if (project) {
      return res.status(200).json({
        status: 200,
        message: "The task has been deleted.",
        data: project,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "The task hasn't been deleted.",
        data: project,
      });
    }
  } finally {
    client.close();
  }
};

// Sign In
const signIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const email = req.params.email;
    const password = req.params.password;

    const user = await db
      .collection("users")
      .findOne({ email: email, password: password });

    if (user) {
      return res
        .status(200)
        .json({ status: 200, message: "User was logged in.", data: user });
    } else {
      return res.status(404).json({
        status: 404,
        message: "User wasn't logged in.",
        data: project,
      });
    }
  } finally {
    client.close();
  }
};
// pull from the purchasing thing to show the error

// Resgister User - works
const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const newUser = req.body;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    newUser.oraganization = "Eechee";

    const user = await db.collection("users").insertOne(req.body);
    if (user.length === 1) {
      return res.status(200).json({
        status: 200,
        message: "New user added!",
        data: newUser,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "User fail to sign up",
        data: newUser,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getUsers,
  getUser,
  getProjects,
  getProject,
  addTask,
  deleteTask,
  addUser,
  signIn,
  getTasksUser,
};
