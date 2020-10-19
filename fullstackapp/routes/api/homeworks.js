const express = require('express');
const router = express.Router();
const Homework = require('../../models/modelHomeworks');

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
    if (!homework) return res.status(404).send(`Could not found with Id: ${req.params.id}`);

    return res.status(200).send(homework);
  });
});

//Create new document
router.post('/', (req, res) => {
  //create a homework object
  const newHomework = new Homework(req.body);
  //check validations
  let valRet = newHomework.validateSync();
  if(valRet) {
    return res.status(422).json({
      status: "error",
      details: valRet.message
    });
  }
  //insert new homework
  newHomework.save((err, homework) => {
    if (err) {
      console.log(err);
      return res.status(400).send();
    }

    return res.status(201).send(homework);
  });
});

//Update an existing document by Id
router.put('/:id', (req, res) => {
  console.log(`Update an existing document by Id: ${req.params.id}`);
  //update options
  const options = {
    new: true,
    runValidators: true
  };
  // return one homework data from mongo
  Homework.findByIdAndUpdate(req.params.id, req.body, options, (err, homework) => {
    if(err) {
      return res.status(422).json({
        status: "error",
        details: err.message
      });
    }
    if (!homework) return res.status(404).send(`Could not found with Id: ${req.params.id}`);

    return res.status(204).send(homework);
  });
});

//Delete an existing document by Id
router.delete('/:id', (req, res) => {
  console.log(`Delete an existing document by Id: ${req.params.id}`);

  // return one homework data from mongo
  Homework.findByIdAndDelete(req.params.id, (err, homework) => {
    if (!homework) return res.status(404).send(`Could not found with Id: ${req.params.id}`);

    return res.status(204).send();
  });
});

module.exports = router;
