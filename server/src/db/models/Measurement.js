const { MeasurementModel } = require("../schemas/measurement");

const Measurement = {
  /** 치수 생성 */
  create: async (newMeasurement) => {
    try {
      await MeasurementModel.create(newMeasurement);

      return;
    } catch(error) {
      throw error;
    }
  },

  findAll: async () => {
    try {
      const measurementData = await MeasurementModel.find({}, "_id measurement");

      return measurementData;
    } catch(error) {
      throw error;
    }
  },
}

exports.Measurement = Measurement;