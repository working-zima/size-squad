const { TypeModel } = require("../schemas/type");

const Type = {
  create: async ({ name }) => {
    try {
      await TypeModel.create({ name });

      return;
    } catch(error) {
      throw error;
    }
  },
}

exports.Type = Type;
