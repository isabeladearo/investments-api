const { Investimento } = require('../database/models');

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
}

const getPriceAssetAverage = async (codCliente, codAtivo) => {
  const sumAssetPrice = await Investimento.sum('valor', {
    where: { codCliente, codAtivo, tipo: { [Op.like]: 'COMPRA' } } });

  const { count } = await Investimento.findAndCountAll({
    where: { codCliente, codAtivo, tipo: { [Op.like]: 'COMPRA' } } });
  
  return sumAssetPrice/count;
}

const getAssetsByCodClient = async (codCliente) => {
  const codAssets = await getAssetsByClient(codCliente);

  const response = await Promise.all(codAssets.map(async (codAsset) => ({
    codCliente,
    codAtivo: codAsset,
    qtdeAtivo: await getAmountOfAsset(codCliente, codAsset),
    valor: await getPriceAssetAverage(codCliente, codAsset),
  })));

  const assetsByClient = response.filter((investment) => investment.qtdeAtivo !== 0);
  return assetsByClient;
};

const getInvestments = async (codId) => {
  const regexNumbersOnly = /^\d+$/g;
  const validateCodId = regexNumbersOnly.test(codId);

  if (validateCodId) {
    const assetsByClient = await getAssetsByCodClient(codId);
    return assetsByClient;
  }
};

module.exports = { getInvestments };
