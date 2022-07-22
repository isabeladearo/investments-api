const express = require('express');

const { registerMiddleware } = require('../middlewares');
const { registerController } = require('../controllers');

const router = express.Router();

router.post('/', registerMiddleware, registerController.registerNewClient);

module.exports = router;