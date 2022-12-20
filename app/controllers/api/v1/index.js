/**
 * @file contains entry point of controllers api v1 module
 */

const administrator = require("./administrator.controller");
const user = require("./user.controller");
const assessor = require("./assessor.controller")
const accession = require("./accession.controller")

module.exports = {
  administrator,
  user,
  assessor,
  accession
};
