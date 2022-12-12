const bcrypt = require("bcrypt");
module.exports = (encryptedPassword, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, result) => {
      if(!!err){
        reject(err);
        return;
      }

      resolve(result);
    })
  })
}