const express = require('express');
const newsRouter = express.Router();
const connection = require('../config/db');

newsRouter.get('',async(req, res) =>{
    res.render('index');
})

newsRouter.get('/inicio',async(req, res) =>{
    res.render('index');
})

newsRouter.get('/nosotros',async(req, res) =>{
    res.render('nosotros');
})

newsRouter.get('/caracteristicas',async(req, res) =>{
    res.render('servicios');
})

newsRouter.get('/contacto',async(req, res) =>{
    res.render('contacto');
})

newsRouter.get('/c  ', (req, res) => {

    const sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('resultado', {
            'results': results
        });

    });

});

newsRouter.post('/add', (req, res) => {

    const sql = `SELECT * FROM customers WHERE name = '${req.body.name}'`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {

            res.send('correo enviado');

        } else {

            const sql = 'INSERT INTO customers SET ?';

            const customerObj = {
                name: req.body.name,
                number: req.body.number,
                city: req.body.city,
                email: req.body.email,
                mensaje: req.body.mensaje

            }


            connection.query(sql, customerObj, error => {
                if (error) throw error;
                res.send("correo enviado");

            });
        }

    });




});




module.exports = newsRouter;