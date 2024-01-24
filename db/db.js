const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'sasindu@16941',
        database: 'students_db'
})

module.exports = mysqlPool;