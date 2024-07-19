const jwt = require("jsonwebtoken");

const renameId = (data, newKey) => {
  if (data) {
    const user = { [newKey]: data._id, ...data };
    delete user._id;

    return user;
  }
};

const generateJwtToken = ({ user, secretKey, expiresIn }) => {
  return jwt.sign(
    { user },
    secretKey,
    {
      expiresIn: expiresIn
      , issuer: "size-squad"
    }
  );
}

const getUserIdByAccessToken = ({ accessToken }) => {
  const jwtDecoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
  return jwtDecoded.user;
}

module.exports = {
  renameId, generateJwtToken, getUserIdByAccessToken
};