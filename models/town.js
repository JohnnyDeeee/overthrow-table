'use strict';
module.exports = (sequelize, DataTypes) => {
  const Town = sequelize.define('Town', {
    name: DataTypes.STRING,
    stability: DataTypes.INTEGER,
    population: DataTypes.INTEGER,
    support: DataTypes.INTEGER
  }, {});
  Town.associate = function(models) {
    // associations can be defined here
  };
  return Town;
};