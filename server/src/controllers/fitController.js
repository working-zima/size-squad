const { Fit } = require("../db/models/Fit");

const fitController = {
  getFitList: async (req, res, next) => {
    try {
      const fitData = await Fit.findAll()

      return res.status(200).json(fitData);
    } catch(error) {
      next(error);
    }
  },
}

exports.fitController = fitController;