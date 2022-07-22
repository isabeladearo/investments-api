const express = require('express');

const { investmentsMiddleware } = require('../middlewares');
const { investmentsController } = require('../controllers');

const router = express.Router();

router.post('/comprar', investmentsMiddleware, investmentsController.buyAsset);
router.post('/vender', investmentsMiddleware, investmentsController.sellAsset);

module.exports = router;
