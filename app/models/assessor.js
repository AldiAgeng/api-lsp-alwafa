'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assessor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Assessor.init({
    code_assessor: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Code assessor already exists"
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    certification_field: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    } 
  }, {
    sequelize,
    modelName: 'Assessor',
  });
  return Assessor;
};