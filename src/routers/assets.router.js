const express = require('express');

const { authMiddleware } = require('../middlewares');
const { assetsController } = require('../controllers');

const router = express.Router();

router.use(authMiddleware);

router.get('/:id', assetsController.getAssetByCodAtivo);

router.get('/cliente/:id', assetsController.getAssetsByCodCliente);

module.exports = router;
