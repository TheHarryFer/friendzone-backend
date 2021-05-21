const controller = require("../controllers/discount.controller");

module.exports = function (app) {
  app.post("/api/discount/create", controller.create);

  app.post("/api/discount/uploadDiscountPic", controller.uploadDiscountPic);

};
