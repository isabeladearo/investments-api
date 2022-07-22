const { Investimento, Ativo } = require('../database/models');
const { fetchAssetByTicker } = require('../helpers/fetchAssetsAPI');

const Sequelize = require('sequelize');

const { Op } = Sequelize;

const getAssetsByClient = async (codCliente) => {
  const response = await Investimento.findAll({
    attributes: ['codAtivo'],
    where: { codCliente },
    group: 'codAtivo',
  });

  const assets = response.map((asset) => asset.dataValues.codAtivo);
  return assets;
};

const getAmountOfAsset = async (codCliente, codAtivo) => {
  const purchasedAssets = await Investimento.sum('qtdeAtivo', {
    where: { codCliente, codAtivo, tipo: { [Op.like]: 'COMPRA' } },
  });

  const soldAssets = await Investimento.sum('qtdeAtivo', {
    where: { codCliente, codAtivo, tipo: { [Op.like]: 'VENDA' } },
  });

  return purchasedAssets - soldAssets;
};

const getPriceAssetAverage = async (codCliente, codAtivo) => {
  const sumAssetPrice = await Investimento.sum('valor', {
    where: { codCliente, codAtivo, tipo: { [Op.like]: 'COMPRA' } },
  });

  const { count } = await Investimento.findAndCountAll({
    where: { codCliente, codAtivo, tipo: { [Op.like]: 'COMPRA' } },
  });

  return sumAssetPrice / count;
};

const getAssetsByCodClient = async (codCliente) => {
  const codAssets = await getAssetsByClient(codCliente);

  const response = await Promise.all(
    codAssets.map(async (codAsset) => ({
      codCliente: Number(codCliente),
      codAtivo: codAsset,
      qtdeAtivo: await getAmountOfAsset(codCliente, codAsset),
      valor: await getPriceAssetAverage(codCliente, codAsset),
    })),
  );

  const assetsByClient = response.filter(
    (investment) => investment.qtdeAtivo !== 0,
  );
  return assetsByClient;
};

const getAssetsByCodAsset = async (codAtivo) => {
  const { dataValues } = await Ativo.findOne({ where: { codAtivo } });

  const [asset] = await fetchAssetByTicker(codAtivo);

  return { codAtivo, qtdeAtivo: dataValues.qtdeAtivo, valor: asset.cotacao };
};

const getAssets = async (codId) => {
  const regexNumbersOnly = /^\d+$/g;
  const validateCodId = regexNumbersOnly.test(codId);

  if (validateCodId) {
    const assetsByClient = await getAssetsByCodClient(codId);
    return assetsByClient;
  }

  const asset = await getAssetsByCodAsset(codId);
  return asset;
};

module.exports = { getAssets };
