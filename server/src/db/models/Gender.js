const { GenderModel } = require("../schemas/gender");

const Gender = {
  create: async (newSize) => {
    try {
      await GenderModel.create(newSize);

      return;
    } catch(error) {
      throw error;
    }
  },

  findByGender: async ({gender}) => {
    try {
      const genderData = await GenderModel.findOne(
        {gender}, "_id gender size"
      ).lean();

      return genderData;
    } catch(error) {
      throw error;
    }
  },

  findAll: async () => {
    try {
      const genderData = await GenderModel.find({}, "_id gender size").lean();

      return genderData;
    } catch (error) {
      throw error;
    }
  }
};

exports.Gender = Gender;