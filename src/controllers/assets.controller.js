const { StatusCodes } = require('http-status-codes');
const { assetsService } = require('../services');

const getAssetsByCodCliente = async (req, res) => {
  const assets = await assetsService.getAssetsByCodCliente(req.params.id, req.auth);

  if (!assets) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não foi possível realizar a operação' });

  return res.status(StatusCodes.OK).json(assets);
};

const getAssetByCodAtivo = async (req, res) => {
  const asset = await assetsService.getAssetByCodAtivo(req.params.id);

  if (!asset) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não foi possível realizar a operação' });

  return res.status(StatusCodes.OK).json(asset);
};

module.exports = { getAssetByCodAtivo, getAssetsByCodCliente };
