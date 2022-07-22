const express = require('express');

const { accountMiddleware } = require('../middlewares');
const { accountController } = require('../controllers');

const router = express.Router();

router.post('/', accountMiddleware, accountController.createWithdraw)

module.exports = router;
