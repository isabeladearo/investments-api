const fetch = require('node-fetch');
const { StatusCodes } = require('http-status-codes');

const fetchAssets = async () => {
  const url = 'https://assets-api-backend.herokuapp.com/assets';

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Não foi possível solicitar cotacao do ativo' };
  }
}

module.exports = fetchAssets;
