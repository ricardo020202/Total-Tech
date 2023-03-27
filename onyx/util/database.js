const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'onyx',
//     password: '',
// });


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 8889,
    database: 'onyx',
    password: 'lol23',
});


module.exports = pool.promise();