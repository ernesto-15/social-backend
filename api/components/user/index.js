//*User controller
const controller = require('./controller')
//*Store (Database)
const store = require('../../../store/remote-mysql')

module.exports = controller(store)