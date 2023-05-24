const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Toilette = sequelize.define('Toilette', {
    adresse: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.GEOMETRY,
    },
    arrondissement: {
      type: DataTypes.STRING,
    },
    horaire: {
      type: DataTypes.STRING,
    },
  });

  return Toilette;
};
