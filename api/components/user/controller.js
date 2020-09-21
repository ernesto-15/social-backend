const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLE = 'user';

module.exports = (store = require('../../../store/dummy')) => {
  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

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
