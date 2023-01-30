"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CompetencyTestPlace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompetencyTestPlace.hasMany(models.Schedule, {
        foreignKey: "competency_test_place_id",
      });
    }
  }
  CompetencyTestPlace.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CompetencyTestPlace",
    }
  );
  return CompetencyTestPlace;
};
