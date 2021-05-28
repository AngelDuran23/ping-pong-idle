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

newsRouter.get('/customers', (req, res) => {

    const sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('resultado', {
            'results': results
        });

    });

});




module.exports = newsRouter;