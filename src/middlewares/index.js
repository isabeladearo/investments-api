const httpErrorMiddleware = require('./http.error.middleware');
const {
  investmentsMiddleware,
  assetsCodClientMiddleware,
  accountMiddleware,
  loginMiddleware,
  registerMiddleware,
  authMiddleware,
} = require('./validate.request');

module.exports = {
  httpErrorMiddleware,
  investmentsMiddleware,
  assetsCodClientMiddleware,
  accountMiddleware,
  loginMiddleware,
  registerMiddleware,
  authMiddleware,
};
