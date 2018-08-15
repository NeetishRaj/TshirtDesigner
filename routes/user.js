/*
 * Title: routes/home.js
 * Description: home.js is route handler for the home page for our application
 *  it ll handle all the HTTP requests for "/home" or "/" roots
 */

// Dependencies
const router = require('express').Router();




// Handling GET requests
router.get("/", (req, res) => {
  res.end("User detected");
});

module.exports = router;
