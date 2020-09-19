const db = {
  user: [
    {
      id: '1',
      name: 'Ernesto',
    },
  ],
};

async function list(table) {
  return db[table];
}

async function get(table, id) {
  const collection = await list(table);
  return collection.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
  const createdUser = db[table].push(data);
  console.log(db)
  return createdUser
}

async function remove(table, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
