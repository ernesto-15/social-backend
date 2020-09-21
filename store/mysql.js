//*Dependencies
//Mysql
const mysql = require('mysql');

//*External Files
//Configuration
const config = require('../config');

const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleConnection() {
  connection = mysql.createConnection(dbConf);
  connection.connect((err) => {
    if (err) {
      return console.error('[db-error]', err);
    }
    console.log('Database connected');
    connection.on('error', (err) => {
      console.error('[db-error]', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleConnection();
      } else {
        throw err;
      }
    });
  });
}

handleConnection();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id = "${id}"`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id = ?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) => {
      if (err) return reject(err);
      resolve(result[0] || null);
    });
  });
}

async function upsert(table, data) {
  const row = await get(table, data.id)
  if (row.length === 0) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
