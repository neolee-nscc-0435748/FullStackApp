//ref: https://codesandbox.io/s/y4pmy07xz?file=/src/Form/schema.js:0-312
import Joi from "joi-browser";

const schemaSignIn = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2}).required(),
  password: Joi.string().min(5).max(255).required(),
  error: Joi.object().allow(null),
});

const schemaRegister = Joi.object().keys({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainAtoms: 2}).required(),
  password: Joi.string().min(5).max(255).required(),
  error: Joi.object().allow(null),
});

const schemaHomework = Joi.object().keys({
  title:Joi.string().min(3).max(50).required(),
  score: Joi.number().integer().min(0).max(100).required(),
  due_date: Joi.date().required(),
  school: Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(3).max(100).required(),
    logo: Joi.string().min(3).max(200).required(),
  }),
  error: Joi.object().allow(null),
});

export { schemaSignIn, schemaRegister, schemaHomework };