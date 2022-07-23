const { Cliente } = require('../database/models');
const { generateJWTToken } = require('../helpers/JWTToken');

const authenticateLogin = async ({ email, senha }) => {
  const client = await Cliente.findOne({
    where: { email, senha },
    attributes: { exclude: ['senha', 'saldo'] },
  });

  if (!client) return false;

  const payload = {
    codCliente: client.dataValues.codCliente,
    nome: client.dataValues.nome,
    email: client.dataValues.email,
  };

  const token = generateJWTToken(payload);
  return { token };
};

module.exports = {
  authenticateLogin,
};
