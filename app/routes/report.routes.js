const controller = require("../controllers/report.controller.js");

module.exports = function (app) {
  app.post("/api/report/create", controller.create);

  app.get("/api/report/getReportTypeUserList", controller.getReportTypeUserList);

  app.get("/api/report/getReportTypeEventList", controller.getReportTypeEventList);

  app.get("/api/report/getReportTypeWebList", controller.getReportTypeWebList);
};
