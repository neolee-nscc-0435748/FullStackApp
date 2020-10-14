const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  _id: String,
  title: String,
  score: Number,
  due_date: Date,
  submit: [{
    seq_no: Number,
    title: String,
    text_content: String,
    _id: false
  }],
  progress: Number,
  subject: {
    title: String,
    teacher_name: {
      first: String,
      last: String
    }
  },
  semester: {
    year: Number,
    name: String
  },
  school: {
    name: String,
    address: String,
    logo: String
  }
});

module.exports = mongoose.model('Homework', homeworkSchema);