import Joi from "joi-browser";

//ref: https://codesandbox.io/s/y4pmy07xz?file=/src/Form/Form.js:612-978
class Validation {
  constructor() {
    this.valid = null;
  }

  validate = (schema, data) => {
    this.valid = Joi.validate(data, schema, {
      abortEarly: false
    });

    const newErrorObject = {};
    if (this.valid.error) {
      this.valid.error.details.forEach(err => {
        newErrorObject[err.path.join(".")] = err.message;
      });

      // console.log(valid.error);
      return { error: newErrorObject };
    }

    return null;
  };

  getErrorMsg = (error, name) => {
    if (!error) {
      return null;
    }

    return error[name] || null;
  }
}

export default new Validation();