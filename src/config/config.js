require('dotenv').config();


module.exports={
    server:{
        port:process.env.PORT
    },
    db:{
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    },
    mail:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    },
    
}