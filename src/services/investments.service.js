const { Ativo, Cliente, Investimento } = require('../database/models');
const { StatusCodes } = require('http-status-codes');
const fetchAssets = require('../helpers/fetchAssetsAPI');

const Sequelize = require('sequelize');

const { Op } = Sequelize;

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateAssetAvailability = async (codAtivo, qtdeAtivo) => {
  const assetAvailability = await Ativo.findOne({
    where: { codAtivo, qtdeAtivo: { [Op.gt]: qtdeAtivo } },
  });

  if (!assetAvailability) {
    throw { status: StatusCodes.UNAUTHORIZED, message: 'Ativo não disponível' };
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
  });

  if (!client) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: 'Não foi possível realizar a operação',
    };
  }

  return asset;
};

const buyAsset = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  await validateAssetAvailability(codAtivo, qtdeAtivo);

  const asset = await validateClientBalance(codCliente, codAtivo, qtdeAtivo);

  try {
    const response = await sequelize.transaction(async (t) => {
      const investimento = await Investimento.create(
        { codCliente, codAtivo, qtdeAtivo, valor: asset.price, tipo: 'COMPRA' },
        { transaction: t },
      );

      await Ativo.increment(
        { qtdeAtivo: -Number(`${qtdeAtivo}`) },
        { where: { codAtivo }, transaction: t },
      );

      await Cliente.increment(
        { saldo: -Number(`${asset.totalPrice}`) },
        { where: { codCliente }, transaction: t },
      );

      return investimento;
    });

    return response;
  } catch (error) {
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Não foi possível realizar a operação',
    };
  }
};

module.exports = { buyAsset };
