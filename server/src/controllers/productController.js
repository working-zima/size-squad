const express = require("express");

const productController = {
  getAllProducts: async (req, res, next) => {
    console.log(req)

    return null;
  }
}

exports.productController = productController;