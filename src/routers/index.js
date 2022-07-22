const express = require('express');

const investmentsBuyRouter = require('./investments.buy.router');
const investmentsSellRouter = require('./investments.sell.router');
const assetsRouter = require('./assets.router');
const accountDepositRouter = require('./account.deposit.router');
const accountWithdrawRouter = require('./account.withdraw.router');

const router = express.Router();

router.use('/investimentos/comprar', investmentsBuyRouter);
router.use('/investimentos/vender', investmentsSellRouter);

router.use('/ativos', assetsRouter);

router.use('/conta/deposito', accountDepositRouter);
router.use('/conta/saque', accountWithdrawRouter);

module.exports = router;
