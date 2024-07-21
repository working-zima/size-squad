const { Category } = require('../db/models/Category');
const { Fit } = require('../db/models/Fit');
const { Gender } = require('../db/models/Gender');
const { Size } = require('../db/models/Size');

const initialDataController = {
  /** 카테고리 등록 */
  getInitialData: async (req, res, next) => {
    try {
      const [categories, genders, sizes, fits] = await Promise.all([
        Category.findAll(),
        Gender.findAll(),
        Size.findAll(),
        Fit.findAll()
      ]);

      return res.status(200).json({
        initialData: { categories, genders, sizes, fits }
      });
    } catch(error) {
      next(error);
    }
  },

}

exports.initialDataController = initialDataController;