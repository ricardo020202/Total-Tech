const mysql = require('mysql2');

//Switch as necesary

// Mac database

const pool = mysql.createPool({
    host: 'localhost',
    user: 'erik',
    database: 'onyx',
    password: 'erik',
    port: 8889,
});

// Windows database

/*
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'onyx',
    password: '',
});
*/




module.exports = pool.promise();