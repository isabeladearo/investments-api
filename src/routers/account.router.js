const express = require('express');

const { accountMiddleware } = require('../middlewares');
const { accountController } = require('../controllers');

const router = express.Router();

// router.use(authMiddleware);

router.post('/deposito', accountMiddleware, accountController.createDeposit);

router.post('/saque', accountMiddleware, accountController.createWithdraw);

router.get('/:id', accountController.getByCodClient);

module.exports = router;
