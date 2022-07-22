module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Investimentos',
      [
        {
          codInvestimento: 1,
          codCliente: 1,
          codAtivo: 1,
          qtdeAtivo: 1000,
          valor: 2.77,
          data: new Date('2022-07-18T14:31:16.000Z'),
          tipo: 'COMPRA',
        },
        {
          codInvestimento: 2,
          codCliente: 2,
          codAtivo: 2,
          qtdeAtivo: 2000,
          valor: 2.31,
          data: new Date('2022-07-18T16:15:59.000Z'),
          tipo: 'COMPRA',
        },
        {
          codInvestimento: 3,
          codCliente: 1,
          codAtivo: 1,
          qtdeAtivo: 500,
          valor: 2.77,
          data: new Date('2022-07-18T14:35:56.000Z'),
          tipo: 'VENDA',
        },
        {
          codInvestimento: 4,
          codCliente: 2,
          codAtivo: 2,
          qtdeAtivo: 1000,
          valor: 2.31,
          data: new Date('2022-07-18T20:18:23.000Z'),
          tipo: 'VENDA',
        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Investimentos', null, {});
  },
};
