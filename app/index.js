const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
// const mongodb = require('./models/mongodb');

const apiGuard = require('./middlewares/request-handler/api_guard');
const rateLimiter = require('./utils/rate_limiter');

const routeHandler = require('./routes');
const exceptionHandler = require('./exceptions');

const app = express();
// mongodb.boot();

/** Plugins */
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** */

/** Global Middlewares */
app.use(apiGuard);
app.use(rateLimiter());
/** */

/** App Handlers */
routeHandler(app);
exceptionHandler(app);
/** */

module.exports = app;
