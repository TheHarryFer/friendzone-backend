const controller = require("../controllers/discount.controller");

module.exports = function (app) {
  app.post("/api/discount/create", controller.create);

  app.post("/api/discount/editDiscount", controller.editDiscount);

  app.post("/api/discount/uploadDiscountPic", controller.uploadDiscountPic);

  app.post("/api/discount/useDiscount", controller.useDiscount);

  app.post("/api/discount/deleteDiscount", controller.deleteDiscount);

  app.get("/api/discount/getHotDiscount/:user_id", controller.getHotDiscount);

  app.get("/api/discount/getBrowseDiscount/:user_id", controller.getBrowseDiscount);

  app.get("/api/discount/getMyDiscount/:user_id", controller.getMyDiscount);

  app.get("/api/discount/displayPic/:discount_id", controller.displayPic);

  app.post("/api/discount/discountTransaction", controller.discountTransaction);
};
