/**
 * @file contains entry point of controllers api v1 module
 */

const administrator = require("./administrator.controller");
const user = require("./user.controller");

module.exports = {
  administrator,
  user,
};
