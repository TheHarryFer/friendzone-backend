const { auth } = require("../middleware");
const controller = require("../controllers/pointTransaction.controller.js");

module.exports = function (app) {
  app.get("/api/point/getPoint/:user_id", controller.getPoint);

  app.get("/api/point/getPointLog/:user_id", controller.getPointLog);
};
