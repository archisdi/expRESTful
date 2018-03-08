require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const ErrorException = require('./app/exceptions/error_exception');
const NotFoundException = require('./app/exceptions/not_found_exception');
const ApiGuard = require('./app/middleware/api_guard');

const routes = require('./routes');
const app = express();

// Golbal Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ApiGuard);

routes(app);

app.use(NotFoundException);
app.use(ErrorException);

module.exports = app;
