const httpErrorMiddleware = require('./http.error.middleware');
const {
  investmentsMiddleware,
  assetsCodClientMiddleware,
  accountMiddleware,
} = require('./validate.request');

module.exports = {
  httpErrorMiddleware,
  investmentsMiddleware,
  assetsCodClientMiddleware,
  accountMiddleware,
};
