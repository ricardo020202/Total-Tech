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

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'Onyx',
//     port: 8889,
//     password: 'root',
// });

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'Onyx',
//     port: 8889,
//     password: 'lol23',
// });

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'Onyx',
//     port: 8889,
//     password: 'lol23',
// });
//  Erik database
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'erik',
//     database: 'onyx',
//     password: 'erik',
//     port: 8889,
// });
// // Windows database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'onyx',
    password: '',
});


module.exports = pool.promise();