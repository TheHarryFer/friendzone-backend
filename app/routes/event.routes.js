//const { bodyValidation } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.post("/api/event/create", controller.create);

  app.post("/api/event/uploadEventPic", controller.uploadEventPic);

  app.post("/api/event/updateInterestEvent", controller.updateInterestEvent);

  app.get("/api/event/displayPic/:event_id", controller.displayPic);
  
  app.get("/api/event/getEventGenderList/:event_id", controller.getEventGenderList);

  app.get("/api/event/getEventCategoryList/:event_id", controller.getEventCategoryList);

  app.get("/api/event/getHostedEvent/:user_id", controller.getHostedEvent);

  app.get("/api/event/getJoinedEvent/:user_id", controller.getJoinedEvent);

  app.get("/api/event/getRequestedEvent/:user_id", controller.getRequestedEvent);

  app.get("/api/event/getInterestedEvent/:user_id", controller.getInterestedEvent);
};
