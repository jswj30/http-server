'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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