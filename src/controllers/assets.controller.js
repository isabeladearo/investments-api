const { StatusCodes } = require('http-status-codes');
const { assetsService } = require('../services');

const getAssetByCodAtivo = async (req, res) => {
  const asset = await assetsService.getAssetByCodAtivo(req.params.id);

  if (!asset) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ativo não encontrado' });

  return res.status(StatusCodes.OK).json(asset);
};

const getAssetsByCodCliente = async (req, res) => {
  const assets = await assetsService.getAssetsByCodCliente(req.params.id);

  if (!assets) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cliente não encontrado' });

  return res.status(StatusCodes.OK).json(assets);
};

module.exports = { getAssetByCodAtivo, getAssetsByCodCliente };
