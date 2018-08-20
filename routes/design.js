/*
 * Title: routes/home.js
 * Description: home.js is route handler for the home page for our application
 *  it ll handle all the HTTP requests for "/home" or "/" roots
 */

// Dependencies
const router = require('express').Router();
const db = require('../model/design-model.js');


// Handling GET requests
router.get("/", (req, res) => {
  res.end("User detected");
});

router.post("/insertDesign", (req, res) => {

  db.insertDesign(req.body, (msg) => {
    console.log(msg);
    res.end(msg);
  })

});

router.get("/getDesign/:id", (req, res) => {

  db.getDesign(req.params.id, (data, msg) => {
    console.log(msg);
    res.end(JSON.stringify(data));
  });
});


router.get("/getDesignList", (req, res) => {

  db.getDesignList((data, msg) => {
    console.log(msg);
    res.end(JSON.stringify(data));
  });
});

module.exports = router;
