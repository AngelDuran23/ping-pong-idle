const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const connection = require('./src/config/db');

const app = express();
const port = process.env.PORT || 3050;

var path = require('path');



app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "ejs");
//mysql
// const connection = mysql.createConnection({
//     host: 'freedb.tech',
//     user: 'freedbtech_angelmanon',
//     password: 'angel',
//     database: 'freedbtech_javascriptmanon'
// });

//route

// const router = express.Router();

const newsRouter = require('./src/routes/routes')
app.use('/',newsRouter)
app.use('/caracteristicas',newsRouter)

// app.get('/', (req, res) => {
//     res.render('index');
// });
// app.get('/nosotros', (req, res) => {
//     res.render('nosotros');
// });
// app.get('/inicio', (req, res) => {
//     res.render('index');
// });
// app.get('/caracteristicas', (req, res) => {
//     res.render('servicios');
// });
// app.get('/contacto', (req, res) => {
//     res.render('contacto');
// });


//Lista de customers

app.get('/customers', (req, res) => {

    const sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('resultado', {
            'results': results
        });

    });

});



app.get('/customers/:id', (req, res) => {
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

// router.get('/add', (req, res) => {
//     res.render('contacto');

// });
app.post('/add', (req, res) => {

    const sql = `SELECT * FROM customers WHERE name = '${req.body.name}'`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {

            res.send('correo enviado');

        } else {

            const sql = 'INSERT INTO customers SET ?';

            const customerObj = {
                name: req.body.name,
                city: req.body.city
            }


            connection.query(sql, customerObj, error => {
                if (error) throw error;
                res.send("correo enviado");

            });
        }

    });




});
// router.get('/update', (req, res) => {
//     res.render('update.ejs');

// });
app.post('/customers', (req, res) => {

    const sql = `UPDATE customers SET name = '${req.body.name}', city='${req.body.email}' WHERE city = '${req.body.email}'`;



    connection.query(sql, error => {
        if (error) throw error;
        res.send("customer updated");

    });

});

// router.get('/delete', (req, res) => {
//     res.render('update.ejs');

// });

app.post('/delete', (req, res) => {

    const sql = `DELETE FROM customers WHERE name = '${req.body.name}'`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send("customer deleted");
        console.log(req.body.name);

    });

});
//check connect



app.post('/correo', (req, res) => {
    const email = req.body.city;
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
                pass: as
            }
        });
        console.log(req.body.email);
        // send mail with defined transport object
        let info = await transporter.sendMail({

            from: `"${req.body.name}" <${req.body.email}>`, // sender address
            to: "angeluisdm05@gmail.com", // list of receivers
            subject: "KLK", // Subject line
            text: `${req.body.mensaje}, Mi correo es: ${req.body.email}, Mi Nombre es:${req.body.name}"`, // plain text body

        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    res.send("Corre Enviado");
    main().catch(console.error);
});

// app.use('/', router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))