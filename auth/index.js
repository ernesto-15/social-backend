//*JWT
const jwt = require('jsonwebtoken');

//*Error util
const error = require('../utils/error');

//*Configuration
const config = require('../config');
const secret = config.jwt.secret;

//*Auth Functions
//Sign Token
function sign(data) {
  return jwt.sign(data, secret);
}

//Verify token
function verify(token) {
  return jwt.verify(token, secret);
}

//Get Token
function getToken(auth) {
  if (!auth) {
    throw error('There is no token', 401);
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 500);
  }

  const token = auth.replace('Bearer ', '');

  return token;
}

//Decode Token
function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}

//Check
const check = {
  //Check token's id with body's id
  own: function check(req, owner) {
    const decoded = decodeHeader(req);
    if (decoded.id !== owner) {
      throw error('You cannot do that', 401);
    }
  },

  logged: function check(req) {
    const decoded = decodeHeader(req);
  },
};

module.exports = {
  sign,
  check,
};
