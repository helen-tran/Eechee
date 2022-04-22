"use strict";
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// GET ALL USERS
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

// GET SINGLE USER
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

// GET ALL TASKS
const getTasks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");

    const tasks = await db.collection("tasks").find().toArray();
    if (tasks) {
      return res
        .status(200)
        .json({ status: 200, message: "Tasks found!", data: tasks });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Tasks not found",
        data: tasks,
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

// GET TASK
const getTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const taskId = req.params.id;

    const task = await db
      .collection("tasks")
      .findOne({ _id: ObjectId(taskId) });
    if (task) {
      return res
        .status(200)
        .json({ status: 200, message: "Found task!", data: task });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Didn't find the task",
        data: task,
      });
    }
  } finally {
    client.close();
  }
};
// GET TASKS FOR USER WITH USER ID
const getTasksUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const userId = req.params.userId;

    const tasks = await db.collection("tasks").find().toArray();

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

// ADD TASKS
const addTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    let newTask = req.body;
    const taskName = req.body.taskName;
    const dueDate = req.body.dueDate;
    const assignees = req.body.assignees;
    const description = req.body.description;
    const checklist = req.body.checklist;

    const db = client.db("eechee-data");
    const result = await db.collection("tasks").insertOne(req.body);

    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Task added.",
        data: newTask,
      });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Can't create the task." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};
// UPDATE TASKS

// DELETE TASKS
const deleteTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const taskId = req.params.taskId;

    const task = await db
      .collection("tasks")
      .deleteOne({ _id: ObjectId(taskId) });

    if (task.deletedCount === 1) {
      return res.status(200).json({
        status: 200,
        message: "The task has been deleted.",
        data: task,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "The task hasn't been deleted.",
        data: task,
      });
    }
  } finally {
    client.close();
  }
};
// Sign In
// pull from the purchasing thing to show the error

// Resgister User
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
  getTasks,
  getTask,
  addTask,
  deleteTask,
  addUser,
  getTasksUser,
};
