var express = require('express');
var router = express.Router();
var homeworksRouter = require('./homeworks')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('This is the API\'s root');
});

// add another router
router.use('/homeworks', homeworksRouter);

module.exports = router;
