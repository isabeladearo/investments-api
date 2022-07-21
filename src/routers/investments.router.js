const express = require('express');

const { investmentsMiddleware } = require('../middlewares');
const { investmentsController } = require('../controllers');

const router = express.Router();

router.post('/comprar', investmentsMiddleware, investmentsController.buyAsset);

module.exports = router;
