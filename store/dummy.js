//Example DB
const db = {
  user: [
    {
      id: '1',
      name: 'Ernesto',
    },
  ],
};

//List all data from a table
async function list(table) {
  return db[table];
}

//Get from id
async function get(table, id) {
  const collection = await list(table);
  return collection.filter((item) => item.id === id)[0] || null;
}

//Create
async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  console.log(db);
}

//Remove
async function remove(table, id) {
  return true;
}

//Query
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
