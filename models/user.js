'use strict';
const crypto = require('crypto');
const { Model } = require('sequelize');
const jointable = require('./jointable');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo, { foreignKey: 'userId', sourceKey: 'id' });
    };
  };

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};