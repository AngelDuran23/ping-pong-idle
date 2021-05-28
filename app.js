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

const newsRouter = require('./src/routes/routes');
app.use('/',newsRouter);

// app.use('/', router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))