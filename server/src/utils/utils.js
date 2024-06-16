const jwt = require("jsonwebtoken");

const renameId = (data, newKey) => {
  if (data) {
    const user = { [newKey]: data._id, ...data };
    delete user._id;
    return user;
  }
};

const generateJwtToken = (userId, secretKey, expiresIn) => {
  return jwt.sign(
    { userId: userId },
    secretKey,
    {
      expiresIn: expiresIn
      , issuer: "size-squad"
    }
  );
}

module.exports = {
  renameId, generateJwtToken
};