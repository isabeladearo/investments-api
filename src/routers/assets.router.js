const express = require('express');

const { assetsController } = require('../controllers');

const router = express.Router();

router.get('/:id', assetsController.getAssets);

module.exports = router;
