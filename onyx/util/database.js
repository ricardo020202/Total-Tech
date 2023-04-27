const mysql = require('mysql2');

//Switch as necesary

// Mac database
//  const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'Onyx',
//     port: 8889,
//     password: 'root',
// });
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'Onyx',
    port: 8889,
    password: 'lol23',
}); 
//  Erik database
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'erik',
//     database: 'onyx',
//     password: 'erik',
//     port: 8889,
// });
// Windows database
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'onyx',
//     password: '',
// });

// Windows database
<<<<<<< HEAD
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'onyx',
    password: '',
});
=======
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'onyx2',
//     password: '',
// });
>>>>>>> fc08566a68df87f6a81ece033b26a53337910aca
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'onyx',
//     password: '',
// });



module.exports = pool.promise();