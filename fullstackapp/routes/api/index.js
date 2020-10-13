var express = require('express');
var router = express.Router();
var homeworkRouter = require('./homeworks')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// add another router
router.use('/homeworks', homeworkRouter);

module.exports = router;
