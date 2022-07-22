module.exports = (sequelize, DataTypes) => {
  const Ativo = sequelize.define(
    'Ativo',
    {
      codAtivo: { type: DataTypes.STRING, primaryKey: true },
      qtdeAtivo: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'Ativos',
    },
  );

  return Ativo;
};
