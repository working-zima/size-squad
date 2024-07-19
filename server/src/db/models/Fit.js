const { FitModel } = require("../schemas/fit");

const Fit = {
  create: async ({ name }) => {
    try {
      await FitModel.create({ name });

      return;
    } catch(error) {
      throw error;
    }
  },

  /** fit 리스트 조회 */
  findAll: async () => {
    try {
      const fitData = await FitModel.find({}, "_id name");

      return fitData;
    } catch(error) {
      throw error;
    }
  },

  /** fit으로 검색 */
  findByFit: async ({fit}) => {
    try {
      const fitData = await FitModel.findOne(
        { fit },
        "_id name"
      ).lean();

      return fitData;
    } catch (error) {
      throw error;
    }
  },
};

exports.Fit = Fit;