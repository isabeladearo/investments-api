const express = require('express');

const { loginMiddleware } = require('../middlewares');
const { loginController } = require('../controllers');

const router = express.Router();

router.use(loginMiddleware);

router.post('/', loginController.authenticateLogin);

module.exports = router;