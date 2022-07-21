const express = require('express');

const investmentsBuyRouter = require('./investments.buy.router');
const investmentsSellRouter = require('./investments.sell.router');

const router = express.Router();

router.use('/investimentos/comprar', investmentsBuyRouter);
router.use('/investimentos/vender', investmentsSellRouter);

module.exports = router;
