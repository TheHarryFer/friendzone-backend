const controller = require("../controllers/admin.controller");

module.exports = function (app) {
  app.get("/api/admin/getReportList", controller.getReportList);

  app.get("/api/admin/getUserList", controller.getUserList);

  app.get("/api/admin/getDiscountList", controller.getDiscountList);

  app.get("/api/admin/searchReport", controller.searchReport);

  app.get("/api/admin/searchUser", controller.searchUser);

  app.get("/api/admin/searchDiscount", controller.searchDiscount);

};
