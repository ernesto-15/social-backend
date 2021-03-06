require('dotenv').config();
module.exports = {
  api: {
    port: process.env.API_PORT || 8080,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'platzisocial',
  },
  mysqlService: {
    host: process.env.MYSQL_SERVICE_HOST || 'localhost',
    port: process.env.MYSQL_SERVICE_PORT || 3001,
  },
  cacheService: {
    host: process.env.CACHE_SERVICE_HOST || 'localhost',
    port: process.env.CACHE_SERVICE_PORT || 3002,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
};
