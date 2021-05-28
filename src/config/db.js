const config = require('../config/config')
const mysql = require('mysql');

const connection = mysql.createPool(config.db);

connection.getConnection(async(error, conn)=>{
    if (error)throw error
    if (conn) {
        await conn.release();
        console.log("db connected")
        return;
        
    }    ;
    
});


module.exports= connection;