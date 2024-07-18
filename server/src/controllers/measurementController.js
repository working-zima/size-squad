const { Measurement } = require("../db/models/Measurement");

const measurementController = {
  /** fit 조회 */
  getMeasurementList: async (req, res, next) => {
    try {
      const measurementData = await Measurement.findAll()

      return res.status(200).json({ measurements: measurementData });
    } catch(error) {
      next(error);
    }
  },
}

exports.measurementController = measurementController;