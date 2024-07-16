const { Size } = require("../db/models/Size");

const sizeController = {
  /** size 조회 */
  getSizes: async (req, res, next) => {
    try {
      const sizeData = await Size.findAll()

      return res.status(200).json({ sizes: sizeData });
    } catch(error) {
      next(error);
    }
  },
}

exports.sizeController = sizeController;