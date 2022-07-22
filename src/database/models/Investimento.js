module.exports = (sequelize, DataTypes) => {
  const Investimento = sequelize.define(
    'Investimento',
    {
      codInvestimento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      codCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
      },
      codAtivo: { type: DataTypes.STRING, primaryKey: true, foreignKey: true },
      qtdeAtivo: DataTypes.INTEGER,
      valor: DataTypes.DECIMAL(11, 2),
      data: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      tipo: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Investimentos',
    },
  );

  Investimento.associate = (models) => {
    models.Cliente.belongsToMany(models.Ativo, {
      as: 'ativos',
      through: Investimento,
      foreignKey: 'codCliente',
      otherKey: 'codAtivo',
    });
    models.Ativo.belongsToMany(models.Cliente, {
      as: 'clientes',
      through: Investimento,
      foreignKey: 'codAtivo',
      otherKey: 'codCliente',
    });
  };

  return Investimento;
};
