const controller = require("../controllers/analyst.controller.js");

module.exports = function (app) {
  app.get("/api/analyst/getAppSummary", controller.getAppSummary);

  app.get("/api/analyst/getEventSummary", controller.getEventSummary);

  app.get("/api/analyst/getEventCategorySummary", controller.getEventCategorySummary);

  app.get("/api/analyst/getUserSummary", controller.getUserSummary);

  app.get("/api/analyst/getUserHistorySummary", controller.getUserHistorySummary);

  app.get("/api/analyst/getDiscountSummary", controller.getDiscountSummary);

  app.get("/api/analyst/getReportSummary", controller.getReportSummary);

  app.get("/api/analyst/getReportTypeSummary", controller.getReportTypeSummary);
};
