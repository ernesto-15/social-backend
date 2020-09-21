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
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  console.log(db);
}

async function remove(table, id) {
  return true;
}

async function query(table, q) {
  const collection = await list(table);
  let keys = Object.keys(q)
  return collection.filter((item) => item[keys[0]] === q[keys[0]])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
