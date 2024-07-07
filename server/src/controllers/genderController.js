const { Gender } = require("../db/models/Gender");

const genderController = {
  getGenderList: async (req, res, next) => {
    try {
      const genderData = await Gender.findAll()

      res.status(200).json({ genders: genderData });
    } catch (error) {
      next(error);
    }
  }
}

exports.genderController = genderController;