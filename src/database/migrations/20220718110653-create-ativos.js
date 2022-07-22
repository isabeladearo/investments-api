module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Ativos = await queryInterface.createTable('Ativos', {
      codAtivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticker: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      qtdeAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });

    return Ativos;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Ativos');
  },
};
