const express = require('express');

const server = express();
server.use(express.json());

const users = ['Diego', 'Cláudio', 'Victor'];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});


function checkNameExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required." });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exist." });
  }

  req.user = user;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/users', checkNameExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  res.send("200");
});

server.put('/users/:index', checkNameExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  res.send("200");
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  res.send("200");
});

server.listen(2832);
