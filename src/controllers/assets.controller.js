const { StatusCodes } = require('http-status-codes');
const { assetsService } = require('../services');

const getAssetByCodAtivo = async (req, res) => {
  const asset = await assetsService.getAssetByCodAtivo(req.params.id);

  return res.status(StatusCodes.OK).json(asset);
};

const getAssetsByCodCliente = async (req, res) => {
  const assets = await assetsService.getAssetsByCodCliente(req.params.id);

  return res.status(StatusCodes.OK).json(assets);
};

module.exports = { getAssetByCodAtivo, getAssetsByCodCliente };
