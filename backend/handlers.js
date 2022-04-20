"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// TEST PURPOSE
// const getCollection = async (dbName) => {
//   // creates a new client
//   const client = new MongoClient(MONGO_URI, options);
//   // connect to the client
//   await client.connect();

//   // connect to the database (db name is provided as an argument to the function)
//   const db = client.db(dbName);
//   console.log("connected!");

//   //   finding data
//   const data = await db.collection("eechee").find().toArray();

//   // close the connection to the database server
//   client.close();
//   console.log("disconnected!");
// };
// getCollection("eechee");

// GET ALL USERS
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("Eechee");

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
    const db = client.db("Eechee");
    const userId = req.params._id;

    const user = await db.collection("users").findOne({ userId });
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
    const db = client.db("Eechee");

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

// GET TASK
const getTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const taskId = req.params._id;

  const db = client.db("Eeechee");

  await db.collection("tasks").findOne({ taskId }, (err, result) => {
    result
      ? res.status(200).json({
          status: 200,
          message: "Found task",
          data: result,
        })
      : res.status(404).json({
          status: 404,
          message: "Didn't find the task.",
          data: result,
        });
    client.close();
  });
};

// ADD TASKS
const addTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    let newTask = req.body;
    const taskName = req.body.taskName;
    const dueDate = req.body.dueDate;
    const assignee = req.body.assignee;
    const description = req.body.description;
    const checklist = req.body.checklist;

    const db = client.db("Eechee");
    const result = await db.collection("tasks").insertOne({ newTask });

    // add tasks to the user data! - a update function
    // const updateFlightInfo = await db
    //   .collection("flights")
    //   .updateOne(
    //     { flightNumber: flightNumber, "seats.id": seat },
    //     { $set: { "seats.$.isAvailable": false } }
    //   );

    if (tasks.length === 1) {
      return res.status(200).json({
        status: 200,
        message: "Task added.",
        data: req.body,
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

// DELETE TASK
const deleteTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Eechee");
    const taskId = req.params._id;

    const task = await db
      .collection("Eechee")
      .deleteOne({ _id: ObjectId(taskId) });

    // delete tasks to the user data! - a update function
    // const updateUserInfo = await db
    //   .collection("user")
    //   .updateOne(
    //     { flightNumber: flightNumber, "seats.id": seat },
    //     { $set: { "seats.$.isAvailable": false } }
    //   );
    if (task.deletedCount === 1) {
      return res.status(200).json({
        status: 200,
        message: "The task has been deleted.",
        data: flight,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "The task hasn't been deleted.",
        data: flight,
      });
    }
  } finally {
    client.close();
  }
};
// Resgister User

// Sign In
const addUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Eechee");
    const newUser = req.body;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    newUser.oraganization = "Eechee";

    const user = await db.collection("users").insertOne(newUser);
    if (user) {
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
