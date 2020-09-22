//*External Files
//Auth layer
const auth = require('../../../auth');

//*Internal functions
module.exports = (action) => {
  //Authentication
  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        const owner = req.body.id;
        auth.check.own(req, owner);
        next();
        break;
      case 'follow':
        auth.check.logged(req);
        next();
        break;
      default:
        next();
    }
  }

  return middleware;
};
