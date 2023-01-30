"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.CompetencyTestPlace, {
        foreignKey: "competency_test_place_id",
      });
    }
  }
  Schedule.init(
    {
      scheme: DataTypes.STRING,
      execution_time: DataTypes.DATE,
      number_of_participants: DataTypes.INTEGER,
      competency_test_place_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
