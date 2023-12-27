import mysql from 'mysql2';

const pool = mysql.createPool({
    host : 'localhost',
    port : '3306',
    user : 'dba',
    password : '1212',
    database : 'alcoholdb'
})

export const db = pool.promise();