const bcrypt = require("bcrypt");
module.exports = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, encryptedPassword) => {
      if(!!err){
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    })
  })
}