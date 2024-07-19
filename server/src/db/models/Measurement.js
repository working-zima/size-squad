const { MeasurementModel } = require("../schemas/measurement");

const Measurement = {
  /** 치수 생성 */
  create: async ({ name }) => {
    try {
      await MeasurementModel.create({ name });

      return;
    } catch(error) {
      throw error;
    }
  },

  findAll: async () => {
    try {
      const measurementData = await MeasurementModel.find({}, "_id name");

      return measurementData;
    } catch(error) {
      throw error;
    }
  },
}

exports.Measurement = Measurement;