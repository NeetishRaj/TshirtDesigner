/*
 * Title: index.js
 * Description: index.js is the entry point for our application
 */


// Dependencies
const express = require('express');
const design = require('./routes/design.js');
const bodyParser = require('body-parser');

// App initialization
const app = express();
const port = process.env.PORT || 8080;

app.use("/", express.static("public/app/index.html"));
app.use("/", express.static("public/app"));

// Parse application/json
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended": true}));

app.use("/design", design);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
