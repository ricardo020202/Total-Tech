const mysql = require('mysql2');

//Switch as necesary

//Mac database

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'onyx',
    port: 8889,
    password: 'root',
});

// Windows database

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'onyx',
//     password: '',
// });






module.exports = pool.promise();