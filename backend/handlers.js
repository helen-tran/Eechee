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
// GET USER
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const userId = req.params.userId;

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

// GET ALL PROJECTS
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

// GET PROJECT
const getProject = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const projectId = req.params._id;

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

// ADD PROJECT
const addProject = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    let newProject = req.body;
    const projectName = req.body.projectName;

    const db = client.db("eechee-data");
    const project = await db.collection("projects").insertOne(req.body);

    if (project) {
      return res.status(200).json({
        status: 200,
        message: "Project created",
        data: req.body,
      });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Can't create the project." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// GET TASKS
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

// GET LISTS ACCORDING TO PROJECT
const getListsProject = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const projectId = req.params.projectId;

    const lists = await db
      .collection("lists")
      .aggregate([{ $match: { projectId: projectId } }])
      .toArray();

    if (lists) {
      return res.status(200).json({
        status: 200,
        message: "Lists for project found!",
        data: lists,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Lists for project not found",
        data: lists,
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

// ADDING LIST
const addList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("eechee-data");
    const list = await db.collection("lists").insertOne(req.body);

    if (list) {
      return res.status(200).json({
        status: 200,
        message: "List created",
        data: req.body,
      });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Can't create the list." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// GET TASKS ACCORDING TO LIST
const getTasksProject = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const listId = req.params.listId;

    const tasks = await db
      .collection("tasks")
      .aggregate([{ $match: { listId: listId } }])
      .toArray();

    if (tasks) {
      return res.status(200).json({
        status: 200,
        message: "Tasks for the list found!",
        data: tasks,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Tasks for the list not found",
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

// GET TASKS/LIST ACCORDING ASSIGNEE AND PROJECT
const getTasksUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const userId = req.params.userId;
    const listId = req.params.listId;

    const assigneeTasks = await db
      .collection("tasks")
      .find({ assignees: { $in: [userId] }, listId: listId })
      .toArray();

    if (assigneeTasks) {
      return res.status(200).json({
        status: 200,
        message: "Tasks for user found!",
        data: assigneeTasks,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Tasks for user not found",
        data: assigneeTasks,
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
    const db = client.db("eechee-data");
    const newTask = req.body;

    const task = await db.collection("tasks").insertOne(req.body);
    if (task) {
      return res.status(200).json({
        status: 200,
        message: "Task added!",
        data: newTask,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Task fail to add.",
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

// ADDING COMMENT
const addComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const taskId = req.params.taskId;

    const userId = req.body.userId;
    const name = req.body.name;
    const comment = req.body.comment;
    const time = req.body.time;

    const addComment = await db.collection("tasks").updateOne(
      { _id: ObjectId(taskId) },
      {
        $push: {
          comments: {
            userId: userId,
            name: name,
            comment: comment,
            time: time,
          },
        },
      }
    );
    if (addComment) {
      return res.status(200).json({
        status: 200,
        message: "comment added!",
        data: req.body,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "comment fail to add.",
        data: req.body,
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
// MARK AS COMPLETE
const markComplete = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const taskId = req.body.taskId;
    const isComplete = req.body.isComplete;

    const updateComplete = await db
      .collection("tasks")
      .updateOne(
        { _id: ObjectId(taskId) },
        { $set: { isComplete: isComplete } }
      );

    if (updateComplete) {
      return res.status(200).json({
        status: 200,
        message: "Mark as complete updated.",
        data: updateComplete,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Mark as complete can't be updated.",
        data: updateComplete,
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

// UPDATING CHECKMARKS IN TASK
const updateCheckmark = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const taskId = req.body.taskId;
    const checklistName = req.body.checklistName;
    const checked = req.body.isChecked;

    const updateCheck = await db
      .collection("tasks")
      .updateOne(
        { _id: ObjectId(taskId), "checklist.checklistName": checklistName },
        { $set: { "checklist.$.isChecked": checked } }
      );

    if (updateCheck) {
      return res.status(200).json({
        status: 200,
        message: "checkmark checked",
        data: updateCheck,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "checkmark can't be updated.",
        data: updateCheck,
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
const signIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("eechee-data");
    const email = req.body.email;
    const password = req.body.password;

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
        data: user,
      });
    }
  } finally {
    client.close();
  }
};

// Resgister User
const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eechee-data");
    const newUser = req.body;
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
  addProject,
  getTasks,
  getTasksProject,
  getListsProject,
  addList,
  updateCheckmark,
  addComment,
  markComplete,
};
