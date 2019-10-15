// include express to project
const express = require('express');

// server instance
const server = express();

// set server to read/write json
server.use(express.json());

// data in memory
let data = ["Fulano", "Cicrano", "Beltrano"];

// get all users
server.get("/users", (req, res) => {
  return res.json(data);
});

// get a particular user by it's index
server.get("/users/:index", (req, res) => {
  const index = req.params.index;
  return res.json(data[index]);
});

// update a particular user data
server.put("/users/:index", (req, res) => {
  const index = req.params.index;
  const { name } = req.body;

  data[index] = name;

  return res.json(data);
});

// delete a particular user
server.delete("/users/:index", (req, res) => {
  const index = req.params.index;
  data.splice(index, 1);

  return res.json(data);
})

server.listen(3001);