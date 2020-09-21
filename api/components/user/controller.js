//*Dependencies
//Nanoid
const { nanoid } = require('nanoid');

//*External files
//Auth component
const auth = require('../auth');

const TABLE = 'users';

//*Internal functions
module.exports = (store = require('../../../store/dummy')) => {
  //List
  function list() {
    return store.list(TABLE);
  }

  //Get
  function get(id) {
    return store.get(TABLE, id);
  }

  //Upsert
  async function upsert({ id, name, username, password }) {
    const user = {
      id: id ? id : nanoid(),
      name,
      username,
    };

    if (password || username) {
      await auth.upsert({
        id: user.id,
        username,
        password,
      });
    }

    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert,
  };
};
