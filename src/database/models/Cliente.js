module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    'Cliente',
    {
      codCliente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      senha: DataTypes.STRING,
      saldo: { type: DataTypes.DECIMAL(11, 2), defaultValue: 0 }
    },
    {
      timestamps: false,
      tableName: 'Clientes',
    },
  );

  return Cliente;
};
