const { GenderModel } = require("../schemas/gender");

const Gender = {
  create: async ({ name }) => {
    try {
      await GenderModel.create({ name });

      return;
    } catch(error) {
      throw error;
    }
  },

  findByGender: async ({ name }) => {
    try {
      const genderData = await GenderModel.findOne(
        { name }, "_id name"
      ).lean();

      return genderData;
    } catch(error) {
      throw error;
    }
  },

  findAll: async () => {
    try {
      const genderData = await GenderModel.find({}, "_id name").lean();

      return genderData;
    } catch (error) {
      throw error;
    }
  }
};

exports.Gender = Gender;