const nanoid = require('nanoid');
const TABLE = 'user';

module.exports = (store = require('../../../store/dummy')) => {
  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  function upsert({id, name}) {
    const user = {
      name,
      id: id ? id : nanoid()
    }
    return store.upsert(TABLE, user)
  }

  return {
    list,
    get,
    upsert,
  };
};
