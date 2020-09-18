const express = require('express');
const { api } = require('../config');
const user = require('../api/components/user/network')

const app = express();

//ROUTER
app.use('/api/user', user)

app.listen(api.port, () => {
  console.log(`Listening port ${api.port}`)
});
