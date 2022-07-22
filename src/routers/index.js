const express = require('express');

const investmentsRouter = require('./investments.router');
const assetsRouter = require('./assets.router');
const accountRouter = require('./account.router');

const router = express.Router();

router.use('/investimentos', investmentsRouter);
router.use('/ativos', assetsRouter);
router.use('/conta', accountRouter);

module.exports = router;
