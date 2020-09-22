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
//Routes
const user = require('../api/components/user/network');
const post = require('../api/components/post/network');
const auth = require('../api/components/auth/network');
//Errors
const {error, notFound} = require('../network/error')

//Express initialization
const app = express();

//Enable reading the request's body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//*Router
app.use('/api/user', user);
app.use('/api/post', post);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//*Errors
app.use(notFound)
app.use(error)

//*Serve Api
app.listen(api.port, () => {
  console.log(`Listening port ${api.port}`);
});
