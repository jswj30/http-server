'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: 'userId' });
      Todo.belongsToMany(models.Complete, { through: 'JoinTable', foreignKey: 'id' });
    }
  };
  Todo.init({
    content: DataTypes.STRING,
    startDate: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};