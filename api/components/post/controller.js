//*Dependencies
//Nanoid
const { nanoid } = require('nanoid');

//*External files
//Auth component
const auth = require('../auth');

const TABLE = 'posts';

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
  async function upsert({ id, title, content, user }) {
    const post = {
      id: id ? id : nanoid(),
      title,
      content,
      user,
    };
    return store.upsert(TABLE, post);
  }
  return {
    list,
    upsert,
    get,
  };
};
