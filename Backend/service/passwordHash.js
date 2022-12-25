const sha = require('sha.js');
const rand = require('csprng');
 
const hashPassword = (plainTextPassword) => {
    let passwordHash = sha('sha256').update(plainTextPassword + rand(160, 36)).digest('hex');
    return passwordHash;
};

module.exports = hashPassword;