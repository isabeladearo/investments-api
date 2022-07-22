const { assetsService } = require('../services');
const { StatusCodes } = require('http-status-codes');

const getAssets = async (req, res) => {
  const response = await assetsService.getAssets(req.params.id);

  return res.status(StatusCodes.OK).json(response);
}

module.exports = { getAssets };
