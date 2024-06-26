const { FitModel } = require("../schemas/fit");

const Fit = {
  create: async (newFit) => {
    try {
      await FitModel.create(newFit);

      return;
    } catch(error) {
      throw error;
    }
  },

  /** fit 리스트 조회 */
  findAll: async () => {
    try {
      const fitData = await FitModel.find({}, "_id fit");

      return fitData;
    } catch(error) {
      throw error;
    }
  },

  /** fit으로 검색 */
  findByFit: async ({fit}) => {

    try {
      let fitData = await FitModel.findOne(
        { fit },
        "_id fit"
      ).lean();

      return fitData;
    } catch (error) {
      throw error;
    }
  },
};

exports.Fit = Fit;