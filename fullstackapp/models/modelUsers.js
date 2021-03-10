/*
  References
   - https://github.com/Automattic/mongoose/issues/5422
   - https://stackoverflow.com/questions/16881832/mongoose-adds-id-to-all-nested-objects : for root only object id
   - https://www.npmjs.com/package/bson-objectid
   - https://emailregex.com/
   - https://www.npmjs.com/package/mongoose-unique-validator
   - https://stackoverflow.com/questions/41924961/user-findone-is-not-a-function
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ObjectID = require('bson-objectid');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    'default': ObjectID.generate
  },
  firstName: {
    type: String,
    maxlength: 100,
    required: true
  },
  lastName: {
    type: String,
    maxlength: 100,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: (input) => {
        return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(input);
      },
      message: 'Email validation failed'
    },
    unique: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 255,
    required: true
  }
},
{
  collection: 'users'
}
);

userSchema.plugin(uniqueValidator);
module.exports = User = mongoose.model('User', userSchema);