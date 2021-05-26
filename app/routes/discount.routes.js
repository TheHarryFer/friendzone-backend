const controller = require("../controllers/discount.controller");

module.exports = function (app) {
  app.post("/api/discount/create", controller.create);

  app.post("/api/discount/uploadDiscountPic", controller.uploadDiscountPic);

  app.get("/api/discount/getHotDiscount", controller.getHotDiscount);

  app.get("/api/discount/getBrowseDiscount", controller.getBrowseDiscount);

  app.get("/api/discount/getMyDiscount/:user_id", controller.getMyDiscount);

  app.get("/api/discount/displayPic/:discount_id", controller.displayPic);
};
