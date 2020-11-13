'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complete extends Model {
    static associate(models) {
      Complete.belongsToMany(models.Todo, { through: 'JoinTable' });
    }
  };
  Complete.init({
    important: DataTypes.BOOLEAN,
    complete: DataTypes.BOOLEAN,
    deleteId: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Complete',
  });
  return Complete;
};