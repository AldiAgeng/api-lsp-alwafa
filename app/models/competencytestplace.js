'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompetencyTestPlace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompetencyTestPlace.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompetencyTestPlace',
  });
  return CompetencyTestPlace;
};