const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const ErrorException = require('./exceptions/error_exception');
const NotFoundException = require('./exceptions/not_found_exception');
const ApiGuard = require('./middlewares/request-handler/api_guard');
const RateLimiter = require('./utils/rate_limiter');
const Helmet = require('helmet');
const Cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(Helmet());
app.use(Cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ApiGuard);
app.use(RateLimiter());

routes(app);

app.use(NotFoundException);
app.use(ErrorException);

module.exports = app;
