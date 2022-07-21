const { investmentsService } = require('../services');
const { StatusCodes } = require('http-status-codes');

const buyAsset = async (req, res) => {
  const asset = await investmentsService.buyAsset(req.body);

  return res.status(StatusCodes.CREATED).json(asset);
}

module.exports = { buyAsset };
