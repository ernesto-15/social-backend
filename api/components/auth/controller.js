//*Dependencies
//Bcrypt
const bcrypt = require('bcrypt');

//*External files
//Auth layer
const auth = require('../../../auth');
//Error util
const error = require('../../../utils/error')

const TABLE = 'auth';

//*Internal functions
module.exports = (store = require('../../../store/dummy')) => {
  //Login
  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });
    const correct = await bcrypt.compare(password, data.password);
    if (correct) {
      //Generate token
      return auth.sign(data);
    } else {
      throw error('Invalid information', 401);
    }
  }

  //Upsert id, username and password
  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  }

  return {
    upsert,
    login,
  };
};
