const httpErrorMiddleware = require('./http.error.middleware');
const investmentsMiddleware = require('./validate.request/investments.middleware');

module.exports = { httpErrorMiddleware, investmentsMiddleware };
