const { GenderModel } = require("../schemas/gender");

const Gender = {
  create: async ({ gender }) => {
    try {
      await GenderModel.create(gender);

      return;
    } catch(error) {
      throw error;
    }
  },

  findByGender: async ({ gender }) => {
    try {
      const genderData = await GenderModel.findOne(
        {gender}, "_id gender"
      ).lean();

      return genderData;
    } catch(error) {
      throw error;
    }
  },

  findAll: async () => {
    try {
      const genderData = await GenderModel.find({}, "_id gender").lean();

      return genderData;
    } catch (error) {
      throw error;
    }
  }
};

exports.Gender = Gender;