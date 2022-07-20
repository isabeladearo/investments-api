require('express-async-errors');
const express = require('express');
const routers = require('./routers');
const { httpErrorMiddleware } = require('./middlewares');

const app = express();

app.use(express.json());

app.use(routers);

app.use(httpErrorMiddleware);

module.exports = app;
