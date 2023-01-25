const { CompetencyTestPlace } =  require('../../../models');

module.exports = {
  async getAllCompetencyTestPlaces(req, res) {
    try {
      const competencyTestPlaces = await CompetencyTestPlace.findAll();
        res.status(200).json({
          status: "Success",
          statusCode: 200,
          message: "Successfully get all competency test places",
          data: {
            competencyTestPlaces
          }
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
  async getCompetencyTestPlaceById(req, res) {
    try {
      const { id } = req.params;
      const competencyTestPlace = await CompetencyTestPlace.findByPk(id);
      if (!competencyTestPlace) {
        res.status(404).json({
          status: "error",
          statusCode: 404,
          name: "NotFound",
          message: "Competency Test Place not found",
        });
      } else {
        res.status(200).json({
          status: "Success",
          statusCode: 200,
          message: "Successfully get competency test place",
          data: {
            competencyTestPlace
          }
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
  async createCompetencyTestPlace(req, res) {
    try {
      const competencyTestPlace = await CompetencyTestPlace.create(req.body);
      res.status(201).json({
        status: "Success",
          statusCode: 200,
          message: "Successfully create competency test place",
          data: {
            competencyTestPlace
          }
      })
    } catch(error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  },
  async updateCompetencyTestPlace(req, res) {
    try {
      const competencyTestPlace = await CompetencyTestPlace.findByPk(req.params.id);
      if(!competencyTestPlace){
        res.status(404).json({
          status: "error",
          statusCode: 404,
          name: "NotFound",
          message: "Competency Test Place not found",
        })
      }else{
        await CompetencyTestPlace.update(req.body, {
          where: {
            id: competencyTestPlace.id
          }
        });
        res.status(200).json({
          status: "Success",
            statusCode: 200,
            message: "Successfully update competency test place",
            data: {
              competencyTestPlace: req.body
            }
        });
      }
    } catch(error){
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  },
  async deleteCompetencyTestPlace (req, res) {
    try {
      const competencyTestPlace = await CompetencyTestPlace.findByPk(req.params.id);
      if(!competencyTestPlace){
        res.status(404).json({
          status: "error",
          statusCode: 404,
          name: "NotFound",
          message: "Competency Test Place not found",
        })
      }else {
        await CompetencyTestPlace.destroy({
          where: {
            id: req.params.id
          }
        });
        res.status(200).json({
          status: "Success",
          statusCode: 200,
          message: "Successfully delete competency test place",
          data: {
            competencyTestPlace
          }
        })
      }
    } catch(error){
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  }
}