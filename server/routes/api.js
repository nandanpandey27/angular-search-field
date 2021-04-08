const express = require('express');
const router = express.Router();

let users = [
  {
    fullName: 'John Smith',
    email: 'john.smith@gmail.com'
  },
  {
    fullName: 'Sarah Parker',
    email: 'sarah.parker@gmail.com'
  },
  {
    fullName: 'Christina Martin',
    email: 'christina.martin@gmail.com'
  }
];

router.get("/users", (req, res, next) => {
  res.json(users);
});

router.post("/users", function (req, res) {
  if(!req.body) {
    return res.sendStatus(400);
  }
    
  const fullName = req.body.fullName;
  const email = req.body.email;
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.sendStatus(400);
  }
  
  const user = { 
    fullName: fullName,
    email: email
  };
    
  users.push(user);
  res.send(user);
});

router.delete("/users/:email", (req, res, next) => {
  const { email } = req.params;
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser) {
    res.sendStatus(400);
  }

  users = users.filter((user) => user.email !== email);
  res.sendStatus(200);
});

module.exports = router;