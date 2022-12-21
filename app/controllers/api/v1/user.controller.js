const {Administrator} = require("../../../models");
const {Assessor} = require("../../../models");
const {Accession} = require("../../../models");
const utils = require("../../../utils");

module.exports = {
  async login(req, res){
    try{
      const admin = await Administrator.findOne({
        where:{
          username: req.body.username
        }
      });

      const assessor = await Assessor.findOne({
        where:{
          username: req.body.username
        }
      })

      const accession = await Accession.findOne({
        where:{
          username: req.body.username
        }
      })
      console.log(admin, assessor, accession)

      if(!admin && !assessor && !accession){
        return res.status(401).json({
          status: "fail",
          statusCode: 401,
          name: "Unauthorized",
          message: "Username or password is wrong",
        });
      }

      if(admin){
      const isPasswordValid = await utils.checkPassword(admin.password, req.body.password)
      if(!isPasswordValid){
        return res.status(401).json({
          status: "fail",
          statusCode: 401,
          name: "Unauthorized",
          message: "Username or password is wrong",
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

      }else if(assessor){
        const isPasswordValid = await utils.checkPassword(assessor.password, req.body.password)
        if(!isPasswordValid){
          return res.status(401).json({
            status: "fail",
            statusCode: 401,
            name: "Unauthorized",
            message: "Username or password is wrong",
          });
        }
        const token = utils.createToken({
          id: assessor.id,
          username: assessor.username,
          code_assessor: assessor.code_assessor,
        });

        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "User successfully logged in",
          data: {
            token,
          }
        })
      }else if(accession){
        const isPasswordValid = await utils.checkPassword(accession.password, req.body.password)
        if(!isPasswordValid){
          return res.status(401).json({
            status: "fail",
            statusCode: 401,
            name: "Unauthorized",
            message: "Username or password is wrong",
          });
        }
        const token = utils.createToken({
          id: accession.id,
          username: accession.username,
          code_accession: accession.code_accession,
        });

        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "User successfully logged in",
          data: {
            token,
          }
        })
      }

        

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