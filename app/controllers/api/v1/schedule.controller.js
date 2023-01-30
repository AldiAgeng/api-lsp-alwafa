const { Schedule } = require("../../../models");
const { CompetencyTestPlace } = require("../../../models");

module.exports = {
  async getAllSchedules(req, res) {
    try {
      const schedules = await Schedule.findAll({
        include: [
          {
            model: CompetencyTestPlace,
            attributes: ["name", "address"],
          },
        ],
        attributes: ["id", "scheme", "execution_time", "number_of_participants"],
      });
      res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Successfully get all schedules",
        data: {
          schedules,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  },
  async getScheduleById(req, res) {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findOne({
        where: {
          id,
        },
        include: [
          {
            model: CompetencyTestPlace,
            attributes: ["name", "address"],
          },
        ],
        attributes: ["id", "scheme", "execution_time", "number_of_participants"],
      });

      if (!schedule) {
        return res.status(404).json({
          status: "error",
          statusCode: 404,
          name: "NotFound",
          message: `Schedule with id: ${id} not found`,
        });
      } else {
        res.status(200).json({
          status: "Success",
          statusCode: 200,
          message: `Successfully get schedule with id: ${id}`,
          data: {
            schedule,
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  },
  async createSchedule(req, res) {
    try {
      const schedule = await Schedule.create(req.body);

      res.status(201).json({
        status: "Success",
        statusCode: 201,
        message: "Successfully create new schedule",
        data: {
          schedule,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  },
  async updateSchedule(req, res) {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findOne({
        where: {
          id,
        },
      });

      if (!schedule) {
        return res.status(404).json({
          status: "error",
          statusCode: 404,
          name: "NotFound",
          message: `Schedule with id: ${id} not found`,
        });
      } else {
        await schedule.update(req.body, {
          where: {
            id,
          },
        });

        res.status(200).json({
          status: "Success",
          statusCode: 200,
          message: `Successfully update schedule with id: ${id}`,
          data: {
            schedule: req.body,
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  },
  async deleteSchedule(req, res) {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findOne({
        where: {
          id,
        },
      });

      if (!schedule) {
        return res.status(404).json({
          status: "error",
          statusCode: 404,
          name: "NotFound",
          message: `Schedule with id: ${id} not found`,
        });
      } else {
        await Schedule.destroy({
          where: {
            id,
          },
        });

        res.status(200).json({
          status: "Success",
          statusCode: 200,
          message: `Successfully delete schedule with id: ${id}`,
          data: {
            schedule,
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  },
};
