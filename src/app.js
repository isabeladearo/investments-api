require('express-async-errors');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = require('./docs/swagger.config.json');
const routers = require('./routers');
const { httpErrorMiddleware } = require('./middlewares');

const swaggerDoc = swaggerJSDoc(options);

const app = express();

app.use(cors());

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(routers);

app.use(httpErrorMiddleware);

module.exports = app;
