const jwt = require('jsonwebtoken');

const validationJWT = (req, res, next) => {
  const xAuthToken = req.header('x-auth-token');
  if(!xAuthToken){
    return res.status(401).send('Access is Denied');
  }

  jwt.verify(xAuthToken, process.env.JWT_SECURITY_KEY, (err, decoded) => {
    if(err) {
      return res.status(401).send('Access is Denied with Token');
    }

    next();
  });
}

module.exports = validationJWT;