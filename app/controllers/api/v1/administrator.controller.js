const {Administrator} = require("../../../models");
const utils = require("../../../utils");

module.exports = {
  async getAllAdministrator(req, res) {
    try {
      const administrator = await Administrator.findAll();
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Administrator successfully retrieved",
        data: {
          administrator,
        }
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  },
  async getAdministratorById(req, res) {
    try {
      const administrator = await Administrator.findOne({
        where: {
          id: req.params.id
        }
      });
      if(administrator){
        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Administrator successfully retrieved",
          data: {
            administrator,
          }
        });
      }else{
        res.status(404).json({
          status: "fail",
          statusCode: 404,
          message: "Administrator not found"
        })
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
  async createAdministrator(req, res) {
    try {
      const password = await utils.encryptedPassword(req.body.password)
      console.log(password)
      const administrator = await Administrator.create({
        ...req.body,
        password
      })
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Administrator created successfully",
        data: {
          administrator
        }
      })
    } catch (error) {
      if(error.name === "BadRequest" || error.name === "SequelizeValidationError") {
        res.status(400).json({
          status: "failed",
          statusCode: 400,
          name: "BadRequest",
          message: error.message
        })
      } else {
        res.status(500).json({
          status: "failed",
          status_code: 500,
          name: "Internal Server Error",
          message: `Internal Server Error: ${error}`,
        })
      }
    }
  },
  async updateAdministrator(req, res) {
    try {
      const administrator = await Administrator.findOne({
        where: {
          id: req.params.id
        }
      });

      if(!administrator) {
        return res.status(404).json({
          status: "failed",
          statusCode: 404,
          name: "NotFound",
          message: "Administrator not found"
        })
      }

      await Administrator.update(req.body, {
        where: {
          id: req.params.id
        }
      });

      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Administrator updated successfully",
        data: {
          administrator: req.body
        }
      })
    } catch (error) {
        res.status(500).json({
          status: "failed",
          status_code: 500,
          name: "Internal Server Error",
          message: `Internal Server Error: ${error}`,
        })
    }
  },
  async deleteAdministrator(req, res) {
    try {
      const administrator = await Administrator.findOne({
        where: {
          id: req.params.id
        }
      });

      if(!administrator) {
        throw {
          name: "NotFound",
          message: "Administrator not found"
        }
      }

      await Administrator.destroy({
        where: {
          id: req.params.id
        }
      });

      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Administrator deleted successfully",
        data: {
          administrator
        }
      })
    } catch (error) {
      if(error.name === "NotFound") {
        res.status(404).json({
          status: "failed",
          statusCode: 404,
          name: "NotFound",
          message: error.message
        })
      } else {
        res.status(500).json({
          status: "failed",
          status_code: 500,
          name: "Internal Server Error",
          message: `Internal Server Error: ${error}`,
        })
      }
    }
  }
}