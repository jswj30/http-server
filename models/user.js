'use strict';
const crypto = require('crypto');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) { };
  };

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    // hooks: {
    //   beforeCreate: () => {
    //     var shasum = crypto.createHmac('sha512', 'SpecialKeY');
    //     shasum.update(data.password);
    //     data.password = shasum.digest('hex');
    //   },
    //   beforeFind: () => {
    //     if (data.where.password) {
    //       var shasum = crypto.createHmac('sha512', 'SpecialKeY');
    //       shasum.update(data.where.password);
    //       data.where.password = shasum.digest('hex');
    //     }
    //   }
    // }
  });
  return User;
};