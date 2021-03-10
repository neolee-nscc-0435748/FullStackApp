/*
  References
   - https://github.com/Automattic/mongoose/issues/5422
   - https://stackoverflow.com/questions/16881832/mongoose-adds-id-to-all-nested-objects : for root only object id
   - https://www.npmjs.com/package/bson-objectid
 */

const mongoose = require('mongoose');
const ObjectID = require('bson-objectid');

const homeworkSchema = new mongoose.Schema({
  _id: {
    type: String,
    'default': ObjectID.generate
  },
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  due_date: {
    type:Date,
    min: '1900-01-01',
    required: true
  },
  submit: [{
    seq_no: {
      type: Number,
      min: 1,
    },
    title: {
      type: String,
      minlength: 3,
      maxlength: 100
    },
    text_content: {
      type: String,
      minlength: 3,
      maxlength: 200
    },
    _id: false
  }],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  subject: {
    title: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true
    },
    teacher_name: {
      first: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
      },
      last: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
      },
    }
  },
  semester: {
    year: {
      type: Number,
      min: 1900,
      max: 2999,
      required: true
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true
    }
  },
  school: {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true
    },
    address: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true
    },
    logo: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true
    }
  }
},
{
  collection: 'homeworks'
}
);

module.exports = Homework = mongoose.model('Homework', homeworkSchema);