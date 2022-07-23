const Sequelize = require('sequelize');
const { Investimento, Ativo } = require('../database/models');
const { fetchAssetByCodAtivo } = require('../helpers/fetchAssetsAPI');

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

const getAssetsByCodCliente = async (codCliente, authId) => {
  if (codCliente !== authId.toString()) return false;

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

const getAssetByCodAtivo = async (codAtivo) => {
  const validCodAtivo = /^\d+$/g.test(codAtivo);

  if (!validCodAtivo) return false;

  const inventoryAsset = await Ativo.findOne({ where: { codAtivo } });

  if (!inventoryAsset) return false;

  const asset = await fetchAssetByCodAtivo(codAtivo);

  return {
    codAtivo: Number(codAtivo),
    qtdeAtivo: inventoryAsset.dataValues.qtdeAtivo,
    valor: asset.cotacao,
  };
};

module.exports = { getAssetByCodAtivo, getAssetsByCodCliente };
