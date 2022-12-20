const {Accession} = require("../../../models")
const utils = require("../../../utils")

module.exports = {
  async getAllAccessions(req, res) {
    try {
      const accession = await Accession.findAll()
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Accession successfully retrieved",
        data: {
          accession,
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
  async getAccessionById(req, res) {
    try {
      const accession = await Accession.findByPk(req.params.id)
      if(accession){
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Accession successfully retrieved",
        data: {
          accession,
        }
      })
      }else{
        res.status(404).json({
          status: "fail",
          statusCode: 404,
          message: "Accession not found"
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
  async createAccession(req, res) {
    try {
      const password = await utils.encryptedPassword(req.body.password)
      const accession = await Accession.create({
        ...req.body,
        password
      })
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Accession successfully created",
        data: {
          accession,
        }
      })
    } catch (error) {
      if(error.name === "SequelizeValidationError"){
        res.status(400).json({
          status: "fail",
          statusCode: 400,
          name: "ValidationError",
          message: error.errors.map((err) => err.message),
        });
      }else{
        res.status(500).json({
          status: "error",
          statusCode: 500,
          name: "InternalServerError",
          message: `Internal Server Error: ${error.message}`,
        });
      }
    }
  },
  async updateAccession(req, res) {
    try {
      const accession = await Accession.findByPk(req.params.id)
      if(accession){
        await Accession.update({
          name: req.body.name,
          type_of_certification: req.body.type_of_certification,
          phone_number: req.body.phone_number,
        }, {
          where: {
            id: req.params.id
          }
        })
        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Accession successfully updated",
          data: {
            accession: req.body,
          }
        })
      }else{
        res.status(404).json({
          status: "fail",
          statusCode: 404,
          message: "Accession not found"
        })
      }
    } catch (error) {
      if(error.name === "SequelizeValidationError"){
        res.status(400).json({
          status: "fail",
          statusCode: 400,
          name: "ValidationError",
          message: error.errors.map((err) => err.message),
        });
      }else{
        res.status(500).json({
          status: "error",
          statusCode: 500,
          name: "InternalServerError",
          message: `Internal Server Error: ${error.message}`,
        });
      }
    }
  },
  async deleteAccession(req, res) {
    try {
      const accession = await Accession.destroy({
        where: {
          id: req.params.id
        }
      })
      if(accession){
        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Accession successfully deleted",
        })
      }else{
        res.status(404).json({
          status: "fail",
          statusCode: 404,
          message: "Accession not found"
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
  }
}