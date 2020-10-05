const express = require('express');

const routes = require('./routes/index');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use(express.static('public'));

module.exports = app;