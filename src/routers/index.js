const express = require('express');

const investmentsBuyRouter = require('./investments.buy.router');
const investmentsSellRouter = require('./investments.sell.router');
const assetsRouter = require('./assets.router');

const router = express.Router();

router.use('/investimentos/comprar', investmentsBuyRouter);
router.use('/investimentos/vender', investmentsSellRouter);

router.use('/ativos', assetsRouter);

module.exports = router;
