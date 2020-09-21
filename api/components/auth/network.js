//*Express
const express = require('express');

//*Responses
const response = require('../../../network/response');

//*Controllers
const controller = require('./index');

//*Routes
const router = express.Router();
router.post('/login', login);

//*Internal Functions
//Login
async function login(req, res) {
  try {
    const token = await controller.login(req.body.username, req.body.password);
    response.success(req, res, token, 200);
  } catch (error) {
    response.error(req, res, 'Invalid information', 400);
  }
}

module.exports = router;
