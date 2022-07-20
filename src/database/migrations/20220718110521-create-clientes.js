module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Clientes = await queryInterface.createTable('Clientes', {
      codCliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      saldo: {
        allowNull: false,
        type: Sequelize.DECIMAL(11, 2),
      },
    });

    return Clientes;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Clientes');
  }
};
