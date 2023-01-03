const sha = require('sha.js');
//const rand = require('csprng');
 
const hashPassword = (plainTextPassword) => {
    let passwordHash = sha('sha256').update(plainTextPassword + 10).digest('hex');
    return passwordHash;
};

module.exports = hashPassword;