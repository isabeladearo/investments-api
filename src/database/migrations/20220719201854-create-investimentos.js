module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Investimentos = await queryInterface.createTable('Investimentos', {
      codInvestimento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      codCliente: {
        references: {
          model: 'Clientes',
          key: 'codCliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      codAtivo: {
        references: {
          model: 'Ativos',
          key: 'codAtivo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      qtdeAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(11, 2),
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return Investimentos;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Investimentos');
  },
};
