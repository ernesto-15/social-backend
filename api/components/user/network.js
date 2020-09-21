//*Express
const express = require('express')

//*Authentication - user
const secure = require('./secure')

//*Responses
const response = require('../../../network/response')

//*Controllers
const controller = require('./index')

//*Routes
const router = express.Router()
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update'), upsert)

//*Internal Functions
//List
async function list(req, res, next) {
  try {
    const list = await controller.list()
    response.success(req, res, list, 200)
  } catch (error) {
    next(error)
  }
}

//Get
async function get(req, res, next) {
  try {
    const user = await controller.get(req.params.id)
    response.success(req, res, user, 200)
  } catch (error) {
    next(error)
  }
}

//Upsert
async function upsert(req, res, next) {
  try {
    const createdUser = await controller.upsert(req.body)
    response.success(req, res, createdUser, 200)
    
  } catch (error) {
    next(error)
  }
}

module.exports = router