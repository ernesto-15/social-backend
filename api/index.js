//*Dependencies
//Express
const express = require('express');
//SwaggerUI
const swaggerUi = require('swagger-ui-express')

//*External Files
//Configuration
const { api } = require('../config');
//Documentation
const swaggerDocs = require('./swagger.json')
//User Route
const user = require('../api/components/user/network');

//Express initialization
const app = express();

//Enable reading the request's body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//*Router
app.use('/api/user', user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//*Serve Api
app.listen(api.port, () => {
  console.log(`Listening port ${api.port}`);
});
