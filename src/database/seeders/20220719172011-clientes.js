module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Clientes',
      [
        {
          codCliente: 1,
          nome: 'Ana Cristina Mattos',
          email: 'anacristinamattos@gmail.com',
          senha: '123456',
          saldo: 200.0,
        },
        {
          codCliente: 2,
          nome: 'Marcelo Pereira da Silva',
          email: 'marcelopereiradasilva@gmail.com',
          senha: '123456',
          saldo: 200.0,
        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});
  },
};
