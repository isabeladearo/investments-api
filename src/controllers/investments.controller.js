const { StatusCodes } = require('http-status-codes');
const { investmentsService } = require('../services');

const buyAsset = async (req, res) => {
  const investment = await investmentsService.buyAsset(req.body, req.auth);

  if (investment.error) {
    return res
      .status(investment.error.statusCode)
      .json({ message: investment.error.message });
  }

  return res.status(StatusCodes.CREATED).json(investment);
};

const sellAsset = async (req, res) => {
  const investment = await investmentsService.sellAsset(req.body, req.auth);

  if (investment.error) {
    return res
      .status(investment.error.statusCode)
      .json({ message: investment.error.message });
  }

  return res.status(StatusCodes.CREATED).json(investment);
};

module.exports = { buyAsset, sellAsset };
