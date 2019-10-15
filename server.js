// include express to project
const express = require('express');

// server instance
const server = express();

// set server to read/write json
server.use(express.json());

// middleware to validade existing users for GET/PUT/DELETE methods
function validadeExistingUser(req, res, next) {
  if (!data[req.params.index]) {
    return res.status(404).json({ error: 'User does not exists.' });
  }

  next();
}

// middleware to validade user data for PUT/POST methods
function validateUserData(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User is required.' });
  }

  next();
}

// implementing of a global middleware
function log(req, res, next) {
  console.time();
  console.log(`${req.method}; ${req.url}`);
  console.timeEnd();

  next();
}

// using a global middleware as a log
server.use(log);

// data in memory
let data = ["Fulano", "Cicrano", "Beltrano"];

// get all users
server.get("/users", (req, res) => {
  return res.json(data);
});

// get a particular user by it's index
server.get("/users/:index", validadeExistingUser, (req, res) => {
  const index = req.params.index;
  return res.json(data[index]);
});

// add a new user
server.post("/users", validateUserData, (req, res) => {
  const { name } = req.body;
  data.push(name);

  return res.json(data);
});

// update a particular user data
server.put("/users/:index", validadeExistingUser, validateUserData, (req, res) => {
  const index = req.params.index;
  const { name } = req.body;

  data[index] = name;

  return res.json(data);
});

// delete a particular user
server.delete("/users/:index", validadeExistingUser, (req, res) => {
  const index = req.params.index;
  data.splice(index, 1);

  return res.json(data);
})

server.listen(3001);