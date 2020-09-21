//*Auth controller
const controller = require('./controller')

//*Store (Database)
const store = require('../../../store/mysql')

module.exports = controller(store)