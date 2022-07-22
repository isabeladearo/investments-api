const express = require('express');

const { assetsController } = require('../controllers');

const router = express.Router();

router.get('/:id', assetsController.getInvestments);

module.exports = router;
