//*Express
const express = require('express');

//*Responses
const response = require('../network/response');

//*Controllers
const store = require('../store/redis');

//*Routes
const router = express.Router();
router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table', upsert);

//*Internal Functions
//List
async function list(req, res, next) {
  const data = await store.list(req.params.table);
  response.success(req, res, data, 200);
}
//Get
async function get(req, res, next) {
  const data = await store.get(req.params.table, req.params.id);
  response.success(req, res, data, 200);
}
//Upsert
async function upsert(req, res, next) {
  try {
    const data = await store.upsert(req.params.table, req.body);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error)
  }
}

module.exports = router;
