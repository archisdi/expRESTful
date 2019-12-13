'use strict';

const {
    HttpError, DBContext, MongoContext
} = require('tymon');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

/** Configuration file */
const { MODELS_PATH } = require('./utils/constants');

/** Handlers */
const ApiGuard = require('./middlewares/api_guard');
const RateLimiter = require('./utils/libs/rate_limiter');
const RouteHandler = require('./routes');
const ExceptionHandler = require('./exceptions');

/** Initialize Express */
const app = express();

/** Initialize common modules */
HttpError.initialize();
DBContext.initialize({
    connection_string: String(process.env.DB_CONNECTION_STRING),
    models_path: MODELS_PATH.SQL
});
MongoContext.initialize({
    connection_string: String(process.env.MONGO_CONNECTION_STRING),
    database: 'MONGO_DB_NAME'
});

/** Plugins */
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Global Middlewares */
app.use(ApiGuard);
app.use(RateLimiter());

/** Register Handlers */
RouteHandler(app);
ExceptionHandler(app);

module.exports = app;
