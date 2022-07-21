const express = require('express');

const investmentsRouter = require('./investments.router');

const router = express.Router();

router.use('/investimentos', investmentsRouter);

module.exports = router;
