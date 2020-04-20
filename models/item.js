'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    baseprice: DataTypes.INTEGER,
    wood: DataTypes.INTEGER,
    steel: DataTypes.INTEGER,
    plastic: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};