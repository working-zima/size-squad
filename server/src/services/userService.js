const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/models/User");

const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const userService = {
  signup: async (newUser) => {
    try {
      newUser.password = await bcrypt.hash(newUser.password, SALT_ROUND);

      const userInfo = User.create(newUser);
      console.log(`userService: `,newUser);
      return userInfo;
    } catch(error) {
      throw new Error(error);
    }
  }
}

exports.userService = userService;