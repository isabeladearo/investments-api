module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Ativos = await queryInterface.createTable("Ativos", {
      codAtivo: {
        allowNull: false,
        primaryKey: true,
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
  }
};
