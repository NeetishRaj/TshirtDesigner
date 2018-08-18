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
const port = process.env.PORT || 8080;

app.use("/", express.static("public/app/index.html"));
app.use("/", express.static("public/app"));
app.use("/user", user);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

/*
 * Uri string based connection is deprecated in Sequelize for security reasons
 * const sequelize =
 * new Sequelize('mysql://morpheus:godOfDreams@localhost:3306/tshirtDesign');
 * therefore using symbol based connections as shown below.
 */

const sequelize = new Sequelize('tshirtDesign', 'morpheus', 'godOfDreams', {
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
