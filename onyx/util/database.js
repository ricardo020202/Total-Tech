const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'erik',
    database: 'onyx',
    password: 'erik',
    port: 8889,
});

module.exports = pool.promise();