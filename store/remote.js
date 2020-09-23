const { response } = require('express');

const axios = require('axios').default;

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  async function list(table) {
    return req('GET', table);
  }
  function get(table, id) {
    return req('GET', table, id);
  }
  function upsert(table, data) {
    if(data.id) {
      return req('PUT', table, data);
    }
    return req('POST', table, data);
  }
  // function query(table, query) {}

  async function req(method, table, data = null) {
    let url = `${URL}/${table}`;
    let body = '';
    if (data && method === 'GET') {
      url += `/${data}`;
    } else if (data) {
      body = JSON.stringify(data);
    }
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          url,
          data: body,
        });
        // console.log(response.data);
        resolve(response.data.body);
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    list,
    get,
    upsert,
  };
}

module.exports = createRemoteDB;
