'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApiBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ApiBook.init({
    apiBookID: DataTypes.STRING,
    apiSource: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ApiBook',
  });
  return ApiBook;
};