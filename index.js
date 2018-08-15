/*
 * Title: index.js
 * Description: index.js is the entry point for our application
 */


// Dependencies
const express = require('express');
const Sequelize = require('sequelize');
const user = require('./routes/user.js');

// App initialization
const app = express();
const port = process.env.PORT || 3000;

app.use("/public", express.static("public"));
app.use("/user", user);

app.listen(port, () => {
  console.log("Listening on port " + port);
});


const sequelize = new Sequelize('morph', 'root', 'morpheus', {
  "dialect": 'mysql',
  "host": 'localhost',
  "operatorsAliases": false,
  "pool": {
    "acquire": 30000,
    "idle": 10000,
    "max": 5,
    "min": 0
  }
});




sequelize.
  authenticate().
  then(() => {
    console.log('Connection has been established successfully.');
  }).
  catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
