'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    baseprice: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};