const redis = require('redis');
const redisConfig = require('../config');

const client = redis.createClient({
  host: redisConfig.redis.host,
  port: redisConfig.redis.port,
  password: redisConfig.redis.password,
});

function list(table) {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject(err);
      let res = data || null;
      if (data) {
        res = JSON.parse(data);
      }
      resolve(res);
    });
  });
}

function get(table, id) {}

async function upsert(table, data) {
  let key = table;
  if (data && data.id) {
    key = `${key}_${data.id}`;
  }
  client.setex(key, 10, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  upsert,
};
