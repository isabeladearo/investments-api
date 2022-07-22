const fetch = require('node-fetch');
const { StatusCodes } = require('http-status-codes');

const fetchAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Não foi possível solicitar cotacao dos ativos',
    };
  }
};

const fetchAssets = async () => {
  const url = 'https://assets-api-backend.herokuapp.com/assets';
  const data = await fetchAPI(url);
  return data;
};

const fetchAssetByTicker = async (ticker) => {
  const url = `https://assets-api-backend.herokuapp.com/assets/search?ticker=${ticker}`;
  const data = await fetchAPI(url);
  return data;
};

module.exports = { fetchAssets, fetchAssetByTicker };
