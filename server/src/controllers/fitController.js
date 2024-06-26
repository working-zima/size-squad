const { Fit } = require("../db/models/Fit");

const fitController = {
  /** fit 조회 */
  getFitList: async (req, res, next) => {
    try {
      const fitData = await Fit.findAll()

      return res.status(200).json({ fits: fitData });
    } catch(error) {
      next(error);
    }
  },
}

exports.fitController = fitController;