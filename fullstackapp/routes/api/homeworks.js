/*
  References
   - https://stackoverflow.com/questions/16881832/mongoose-adds-id-to-all-nested-objects : for root only object id
   - https://www.npmjs.com/package/bson-objectid : for object id generate
 */

var express = require('express');
var router = express.Router();
var ObjectID = require('bson-objectid');
var Homework = require('../../models/modelHomeworks');
var validator = require('../../modules/validations');

//Get all documents
router.get('/', function (req, res) {
  console.log('GET all homeworks');

  // return all homeworks data from mongo
  Homework.find({}, (err, homeworks) => {
    if (err) return res.status(404).send('Error');

    return res.status(200).send(homeworks);
  });
});

//Get one document by Id
router.get('/:id', function (req, res) {
  console.log(`GET one document by Id: ${req.params.id}`);

  // return one homework data from mongo
  Homework.findById(req.params.id, (err, homework) => {
    if (err) return res.status(404).send(`Could not found with Id: ${req.params.id}`);

    return res.status(200).send(homework);
  });
});

//Create new document
router.post('/', (req, res) => {
  //check validations
  const error = validator(req.body)
  if (error != undefined) {
    const {details} = error;
    const message = details.map(i => i.message);

    return res.status(422).json({
      status: "error",
      details: message
    });
  }

  // create a song object ba
  const newHomework = new Homework(req.body);
  newHomework._id = ObjectID(); //generate object id
  newHomework.save((err, homework) => {
    if (err) {
      console.log(err);
      return res.status(400).send();
    }

    res.status(201).send(homework);
  });
});

//Update an existing document by Id
router.put('/:id', (req, res) => {
  console.log(`Update an existing document by Id: ${req.params.id}`);

  // return one homework data from mongo
  Homework.findByIdAndUpdate(req.params.id, req.body,(err, homework) => {
    if (err) return res.status(404).send(`Could not found with Id: ${req.params.id}`);

    //check validations
    const error = validator(req.body)
    if (error != undefined) {
      const {details} = error;
      const message = details.map(i => i.message);

      return res.status(422).json({
        status: "error",
        details: message
      });
    }

    return res.status(204).send(homework);
  });
});

//Delete an existing document by Id
router.delete('/:id', (req, res) => {
  console.log(`Delete an existing document by Id: ${req.params.id}`);

  // return one homework data from mongo
  Homework.findByIdAndDelete(req.params.id, (err, homework) => {
    if (err) return res.status(404).send(`Could not found with Id: ${req.params.id}`);

    return res.status(204).send();
  });
});

module.exports = router;
