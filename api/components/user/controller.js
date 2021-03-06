//*Dependencies
//Nanoid
const { nanoid } = require('nanoid');

//*External files
//Auth component
const auth = require('../auth');

const TABLE = 'users';

//*Internal functions
module.exports = (
  store = require('../../../store/dummy'),
  cache = require('../../../store/dummy')
) => {
  //List
  async function list() {
    let users = await cache.list(TABLE);
    if (!users) {
      console.log('Cache empty')
      users = await store.list(TABLE);
      cache.redis(TABLE, users)
    } else {
      console.log('Data from cache')
    }
    return users
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

  //Follow
  async function follow(from, to) {
    return store.upsert(`${TABLE}_follow`, {
      user_from: from,
      user_to: to,
    });
  }

  //Followers
  async function followers(id) {
    const sql = require('../../../store/mysql');
    return sql.query(`${TABLE}_follow`, { user_to: id });
  }

  return {
    list,
    get,
    upsert,
    follow,
    followers,
  };
};
