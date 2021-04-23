//const { bodyValidation } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.post("/api/event/create", controller.create);

  app.post("/api/event/uploadEventPic", controller.uploadEventPic);

  app.get("/api/event/displayPic/:event_id", controller.displayPic);

  app.get("/api/event/getHostedEvent/:user_id", controller.getHostedEvent);
};
