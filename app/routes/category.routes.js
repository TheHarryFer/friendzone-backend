const controller = require("../controllers/category.controller.js");

module.exports = function (app) {
  app.post("/api/category/create", controller.create);

  app.post("/api/category/uploadCategoryIcon", controller.uploadCategoryIcon);

  app.get("/api/category/getCategoryList", controller.getCategoryList);

  app.get("/api/category/displayIcon", controller.displayCategoryIcon);
};