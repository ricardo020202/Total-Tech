const mysql = require('mysql2');

//Switch as necesary

// Mac database

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'Onyx',
//     port: 8889,
//     password: 'root',
// });

// Windows database

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'onyx1',
    password: '',
});






module.exports = pool.promise();