const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const { Ativo, Cliente, Investimento } = require('../database/models');
const { fetchAssets } = require('../helpers/fetchAssetsAPI');

const { Op } = Sequelize;

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateAssetAvailability = async (codAtivo, qtdeAtivo) => {
  const assetAvailability = await Ativo.findOne({
    where: { codAtivo, qtdeAtivo: { [Op.gt]: qtdeAtivo } },
  });

  if (!assetAvailability) {
    return {
      error: {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Ativo não disponível',
      },
    };
  }

  return true;
};

const getAssetPrice = async (codAtivo, qtdeAtivo) => {
  const data = await fetchAssets();

  const asset = data.find((ativo) => ativo.codAtivo === codAtivo);

  const totalPrice = (asset.cotacao * qtdeAtivo).toFixed(2);

  return { price: asset.cotacao.toFixed(2), totalPrice };
};

const validateClientBalance = async (codCliente, codAtivo, qtdeAtivo) => {
  const asset = await getAssetPrice(codAtivo, qtdeAtivo);

  const client = await Cliente.findOne({
    where: { codCliente, saldo: { [Op.gt]: asset.totalPrice } },
    attributes: { exclude: ['senha'] },
  });

  if (!client) {
    return {
      error: {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Não foi possível realizar a operação',
      },
    };
  }

  return asset;
};

const buyAsset = async ({ codCliente, codAtivo, qtdeAtivo }, authId) => {
  if (codCliente !== authId) {
    return {
      error: {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Não foi possível realizar a operação',
      },
    };
  }

  const assetInventory = await validateAssetAvailability(codAtivo, qtdeAtivo);

  if (assetInventory.error) return assetInventory;

  const asset = await validateClientBalance(codCliente, codAtivo, qtdeAtivo);

  try {
    const response = await sequelize.transaction(async (t) => {
      const investimento = await Investimento.create(
        {
          codCliente,
          codAtivo,
          qtdeAtivo,
          valor: asset.price,
          tipo: 'COMPRA',
        },
        { transaction: t },
      );

      await Ativo.increment(
        { qtdeAtivo: qtdeAtivo * -1 },
        { where: { codAtivo }, transaction: t },
      );

      await Cliente.increment(
        { saldo: asset.totalPrice * -1 },
        { where: { codCliente }, transaction: t },
      );

      return investimento;
    });

    return response;
  } catch (error) {
    return {
      error: {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Não foi possível realizar a operação',
      },
    };
  }
};

const validateAmountOfAsset = async (codCliente, codAtivo, qtdeAtivo) => {
  const purchasedAssets = await Investimento.sum('qtdeAtivo', {
    where: { codCliente, codAtivo, tipo: { [Op.like]: 'COMPRA' } },
  });

  const soldAssets = await Investimento.sum('qtdeAtivo', {
    where: { codCliente, codAtivo, tipo: { [Op.like]: 'VENDA' } },
  });

  const assetsAmount = purchasedAssets - soldAssets;

  if (qtdeAtivo > assetsAmount) {
    return {
      error: {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Não foi possível realizar a operação',
      },
    };
  }

  return true;
};

const sellAsset = async ({ codCliente, codAtivo, qtdeAtivo }, authId) => {
  if (codCliente !== authId) {
    return {
      error: {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Não foi possível realizar a operação',
      },
    };
  }

  const validation = await validateAmountOfAsset(
    codCliente,
    codAtivo,
    qtdeAtivo,
  );

  if (validation.error) return validation;

  const asset = await getAssetPrice(codAtivo, qtdeAtivo);

  if (!asset) {
    return {
      error: {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Não foi possível realizar a operação',
      },
    };
  }

  try {
    const response = await sequelize.transaction(async (t) => {
      const investimento = await Investimento.create(
        {
          codCliente,
          codAtivo,
          qtdeAtivo,
          valor: asset.price,
          tipo: 'VENDA',
        },
        { transaction: t },
      );

      await Ativo.increment(
        { qtdeAtivo },
        { where: { codAtivo }, transaction: t },
      );

      await Cliente.increment(
        { saldo: asset.totalPrice },
        { where: { codCliente }, transaction: t },
      );

      return investimento;
    });

    return response;
  } catch (error) {
    return {
      error: {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Não foi possível realizar a operação',
      },
    };
  }
};

module.exports = { buyAsset, sellAsset };
