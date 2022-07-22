module.exports = (sequelize, DataTypes) => {
  const Ativo = sequelize.define(
    'Ativo',
    {
      codAtivo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ticker: { type: DataTypes.STRING },
      qtdeAtivo: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'Ativos',
    },
  );

  return Ativo;
};
