const express = require('express');
const router = express.Router();
const User = require('../../models/modelUsers');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//Create new document
router.post('/register', (req, res) => {
  //bcrypt password
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (!err) {
      // Store hash in your password DB.
      req.body.password = hash;
      //create a user object
      const newUser = new User(req.body);
      //check validations
      let valRet = newUser.validateSync();
      if(valRet) {
        return res.status(422).json({
          status: "error",
          details: valRet.message
        });
      }
      //insert new homework
      newUser.save((err, user) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            status: "error",
            details: err.message
          });
        }

        //generator JWT
        const token = createJWT();

        return res
          .header({
          'Access-Control-Expose-Headers': 'x-auth-token',
          'x-auth-token': token
          })
          .status(201)
          .json({
            email: user.email,
            _id: user._id
          });
      });
    } else {
      console.log('fail to bcrypt a password!!!');
      return res.status(500).send();
    }
  });
});

//login with email and password
router.post('/login', (req, res) => {
  //create a temp login object
  req.body['firstName'] = 'Tempfirst';
  req.body['lastName'] = 'Templast';
  console.log(req.body);
  let loginUser = new User(req.body);

  //check validations
  let valRet = loginUser.validateSync();
  if(valRet) {
    return res.status(422).json({
      status: "error",
      details: valRet.message
    });
  }
  //find user by email
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) return res.status(404).send(`The email (${req.body.email}) does not exist in the server!`);

    if(err) return res.status(500).send();

    bcrypt.compare(req.body.password, user.password, (err, match) => {
      if (!err) {
        if(match) {
          //generator JWT
          const token = createJWT();

          return res.header({
            'Access-Control-Expose-Headers': 'x-auth-token',
            'x-auth-token': token
          })
            .status(200)
            .send();
        } else {
          return res.status(401).send();
        }
      } else {
        console.log('fail to compare a password!!!');
        return res.status(500).send();
      }
    });
  })
});

function createJWT() {
  //set environment variables
  const jsonSecurityKey = process.env.JWT_SECURITY_KEY;
  const token = jwt.sign(
    {subject: 'PROG3017',
      assignment: 'Assignment 2 and 3',
      student_name: 'Neo Lee',
      exp: Math.floor(Date.now() / 1000) + (60 * 60)  //1 hour
    },
    jsonSecurityKey
  );

  return token;
}

module.exports = router;
