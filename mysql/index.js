//*Dependencies
//Express
const express = require('express');

//*External Files
//Configuration
const { mysqlService } = require('../config');
//Routes
const router = require('./network');

//Express initialization
const app = express();

//Enable reading the request's body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//*Router
app.use('/', router);

//*Serve Api
app.listen(mysqlService.port, () => {
  console.log(`MySQL service listening port ${mysqlService.port}`);
});