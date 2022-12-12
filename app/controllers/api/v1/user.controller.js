const {Administrator} = require("../../../models");
const {Assessor} = require("../../../models");
const utils = require("../../../utils");

module.exports = {
  async login(req, res){
    try{
      const admin = await Administrator.findOne({
        where:{
          username: req.body.username
        }
      });

      if(!admin){
          return res.status(401).json({
            status: "fail",
            statusCode: 401,
            name: "Unauthorized",
            message: "Username or password is wrong",
          });
      }
      
      const isPasswordValid = await utils.checkPassword(admin.password, req.body.password)

      if(!isPasswordValid){
        return res.status(401).json({
          status: "fail",
          statusCode: 401,
          name: "Unauthorized",
          message: "Username or password is wrong coy",
        });
      }

        const token = utils.createToken({
          id: admin.id,
          username: admin.username,
          code_admin: admin.code_admin,
        });

        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "User successfully logged in",
          data: {
            token,
          }
        })

    }catch(error){
      res.status(500).json({
        status: "error",
        statusCode: 500,
        name: "InternalServerError",
        message: `Internal Server Error: ${error.message}`,
      });
    }
  }
}