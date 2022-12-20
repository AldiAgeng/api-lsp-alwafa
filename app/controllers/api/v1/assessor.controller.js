const {Assessor}  = require("../../../models");
const utils = require("../../../utils")

module.exports = {
  async getAllAssessors(req, res){
    try{
      const assessors = await Assessor.findAll();
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Assessor successfully retrieved",
        data: {
          assessors
        }
      })
    }catch(error){
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Serber Error: ${error}`
      })
    }
  },
  async getAssessorById(req, res){
    try{
      const assessor = await Assessor.findOne({
        where: {
          id: req.params.id
        }
      })

      if(assessor){
        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Assessor successfully retrieved",
          data: {
            assessor,
          }
        });
      }else{
        res.status(404).json({
          status: "fail",
          statusCode: 404,
          name: "NotFound",
          message: "Assessor not found"
        })
      }

    }catch(error){
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error}`
      })
    }
  },
  async createAssessor(req, res){
    try{
      const password = await utils.encryptedPassword(req.body.password);
      const assessor = await Assessor.create({
        ...req.body,
        password
      })
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Assessor created successfully",
        data: {
          assessor
        }
      })

    }catch(error){
      if(error.name === "SequelizeValidationError") {
        res.status(400).json({
          status: "failed",
          statusCode: 400,
          name: "BadRequest",
          message: error.message
        })
      }else{
        res.status(500).json({
          status: "error",
          statusCode: 500,
          name: "InternalServerError",
          message: `Internal Server Error: ${error}`
        })
      } 
    }
  },
  async updateAssessor(req, res){
    try{
      const assessor = await Assessor.findOne({
        where: {
          id: req.params.id
        }
      })
      if(assessor){
        await Assessor.update({
          name: req.body.name,
          certification_field: req.body.certification_field,
          phone_number: req.body.phone_number,
        }, {
          where: {
            id: req.params.id
          }
        })
        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Assessor updated successfully",
          data: {
            assessor: req.body
          }
        })
      }else{
        res.status(404).json({
          status: "fail",
          statusCode: 404,
          name: "NotFound",
          message: "Assessor not found"
        })
      }
    }catch(error){
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error}`
      })
    }
  },
  async deleteAssessor(req, res){
    try{
      const assessor = await Assessor.findOne({
        where: {
          id: req.params.id
        }
      })
      if(assessor){
        await Assessor.destroy({
          where: {
            id: req.params.id
          }
        })
        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Assessor deleted successfully",
        })
      }else{
        res.status(404).json({
          status: "fail",
          statusCode: 404,
          name: "NotFound",
          message: "Assessor not found"
        })
      }
    }catch(error){
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error}`
      })
    }
  }
}