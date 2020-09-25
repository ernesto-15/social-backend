//*User controller
const controller = require('./controller')
//*Store (Database)
const store = require('../../../store/remote-mysql')
//*Cache
const cache = require('../../../store/remote-cache')

module.exports = controller(store, cache)