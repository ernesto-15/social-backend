//*Dependencies
//Express
const express = require('express');

//*External Files
//Configuration
const { mysqlService } = require('../config');
//Routes
const router = require('./network');
//Errors
const {error, notFound} = require('../network/error')

//Express initialization
const app = express();

//Enable reading the request's body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//*Router
app.use('/', router);

//*Errors
app.use(notFound)
app.use(error)

//*Serve Api
app.listen(mysqlService.port, () => {
  console.log(`MySQL service listening port ${mysqlService.port}`);
});