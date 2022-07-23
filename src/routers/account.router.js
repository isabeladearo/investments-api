const express = require('express');

const { authMiddleware, accountMiddleware } = require('../middlewares');
const { accountController } = require('../controllers');

const router = express.Router();

router.use(authMiddleware);

router.post('/deposito', accountMiddleware, accountController.createDeposit);

router.post('/saque', accountMiddleware, accountController.createWithdraw);

router.get('/:id', accountController.getAccountByCodClient);

module.exports = router;
