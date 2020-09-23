//*Express
const express = require('express');

//*Responses
const response = require('../network/response');

//*Controllers
const store = require('../store/mysql');

//*Routes
const router = express.Router();
router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
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
//Insert
async function insert(req, res, next) {
  try {
    const data = await store.insert(req.params.table, req.body);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error)
  }
}
//Upsert
async function upsert(req, res, next) {
  try {
    const data = await store.update(req.params.table, req.body);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error)
  }
}

module.exports = router;
