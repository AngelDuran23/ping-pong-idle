const express = require('express');
const newsRouter = express.Router();
const connection = require('../config/db');
const nodemailer = require('nodemailer');
const { config } = require('dotenv');
const config1 = require('../config/config')

newsRouter.get('', async (req, res) => {
    res.render('pages/index');
})

newsRouter.get('/inicio', async (req, res) => {
    res.render('pages/index');
})

newsRouter.get('/nosotros', async (req, res) => {
    res.render('pages/nosotros');
})

newsRouter.get('/caracteristicas', async (req, res) => {
    res.render('pages/servicios');
})

newsRouter.get('/contacto', async (req, res) => {
    res.render('pages/contacto');
})

newsRouter.get('/c  ', (req, res) => {

    const sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('pages/resultado', {
            'results': results
        });

    });

});
// SELecT
newsRouter.get('/customers', (req, res) => {

    const sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('pages/resultado', {
            'results': results
        });

    });

});


newsRouter.get('/customers/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = `SELECT * FROM customers WHERE id = ${id}`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);

        } else {
            res.send('not result');
        }

    });

});


//Insertar

newsRouter.post('/add', (req, res) => {

    const sql = `SELECT * FROM customers WHERE email = '${req.body.email}'`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            const email = req.body.email;
            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();
        
                // create reusable transporter object using the default SMTP transport
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
        
                    auth: {
                        user: 'angeluisdm10@gmail.com',
                        pass: '8095312167'
                    }
                });
                console.log(req.body.email);
                // send mail with defined transport object
                let info = await transporter.sendMail({
        
                    from: `"${req.body.name}" <${req.body.email}>`, // sender address
                    to: "angeluisdm05@gmail.com", // list of receivers
                    subject: "Trabajo", // Subject line
                    text: `${req.body.mensaje}, Mi correo es: ${req.body.email}, Mi Nombre es:${req.body.name},Mi Numero es:${req.body.number} "`, // plain text body
        
                });
        
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
            

            res.render('pages/index');
            main().catch(console.error);
        } else {
            const email = req.body.email;
            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();
        
                // create reusable transporter object using the default SMTP transport
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
        
                    auth: {
                        user: 'angeluisdm10@gmail.com',
                        pass: '8095312167'
                    }
                });
                console.log(req.body.email);
                // send mail with defined transport object
                let info = await transporter.sendMail({
        
                    from: `"${req.body.name}" <${req.body.email}>`, // sender address
                    to: "angeluisdm05@gmail.com", // list of receivers
                    subject: "Trabajo", // Subject line
                    text: `${req.body.mensaje}, Mi correo es: ${req.body.email}, Mi Nombre es:${req.body.name},Mi Numero es:${req.body.number}"`, // plain text body
        
                });
        
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
           

            const sql = 'INSERT INTO customers SET ?';

            const customerObj = {
                name: req.body.name,
                number: req.body.number,
                city: req.body.city,
                email: req.body.email,
               

            }


            connection.query(sql, customerObj, error => {
                if (error) throw error;
            

            });

            res.render('pages/index');
            main().catch(console.error);
        }

    });




});


//Update

newsRouter.post('/customers', (req, res) => {

    var sql = `UPDATE customers SET name = '${req.body.name}', number = '${req.body.number}', city='${req.body.city}', email ='${req.body.email}' WHERE email = '${req.body.email}'`;


    connection.query(sql, error => {
        if (error) throw error;
        

    });

    var sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('pages/resultado', {
            'results': results
        });

    });
    
});

//DELETE

newsRouter.post('/customers', (req, res) => {

    let sql = `DELETE FROM customers WHERE email = '${req.body.email}'`;
    connection.query(sql, error => {
        if (error) throw error;
        
       

    });

     sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('pages/resultado', {
            'results': results
        });

    });





});



//CORREO
newsRouter.post('/correo', (req, res) => {
   
});

module.exports = newsRouter;