//any imports
const Joi = require('joi');

//define schema
const homeworkSchema = Joi.object({ //build a schema for validations
  subject: {
    teacher_name: {
      first: Joi.string().min(3).max(30).required(),
      last: Joi.string().min(3).max(30).required()
    },
    title: Joi.string().min(3).max(50).required(),
  },
  semester: {
    year: Joi.number().integer().min(1).max(2999).required(),
    name: Joi.string().min(3).max(50).required(),
  },
  school: {
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(3).max(100).required(),
    logo: Joi.string().min(3).max(200).required(),
  },
  title:Joi.string().min(3).max(50).required(),
  score: Joi.number().integer().min(0).max(100).required(),
  progress: Joi.number().integer().min(0).max(100).required(),
  due_date: Joi.date().required(),
  submit: Joi.array().required(),
});

//functions
function validateHomework(data) {
  const {error, value} = homeworkSchema.validate(data, {abortEarly: false});
  console.log(error);
  console.log(value);

  return error;
}

module.exports = validateHomework;