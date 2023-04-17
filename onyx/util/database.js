const mysql = require('mysql2');

//Switch as necesary

// Mac database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'Onyx',
    port: 8889,
    password: 'root',
});
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
<<<<<<< HEAD
// // Windows database
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'onyx2',
//     password: '',
// });
=======
// Windows database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'onyx',
    password: '',
});
>>>>>>> editar_programa


module.exports = pool.promise();