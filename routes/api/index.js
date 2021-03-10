var express = require('express');
var router = express.Router();
var homeworksRouter = require('./homeworks')
var usersRouter = require('./users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('This is the API\'s root');
});

// add another router
router.use('/homeworks', homeworksRouter);
router.use('/users', usersRouter);

module.exports = router;
