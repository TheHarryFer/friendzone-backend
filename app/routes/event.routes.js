//const { bodyValidation } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.post("/api/event/create", controller.create);

  app.post("/api/event/uploadEventPic", controller.uploadEventPic);

  app.post("/api/event/updateInterestEvent", controller.updateInterestEvent);

  app.post("/api/event/joinEvent", controller.joinEvent);

  app.post("/api/event/cancelRequest", controller.cancelRequest);

  app.post("/api/event/approveRequest", controller.approveRequest);

  app.post("/api/event/declineRequest", controller.declineRequest);

  app.post("/api/event/addModerator", controller.addModerator);

  app.post("/api/event/removeModerator", controller.removeModerator);

  app.post("/api/event/createParticipantReview", controller.createParticipantReview);

  app.post("/api/event/createEventReview", controller.createEventReview);

  app.get("/api/event/displayPic/:event_id", controller.displayPic);

  app.get(
    "/api/event/getEventGenderList/:event_id",
    controller.getEventGenderList
  );

  app.get(
    "/api/event/getEventCategoryList/:event_id",
    controller.getEventCategoryList
  );

  app.get("/api/event/getHostedEvent/:user_id", controller.getHostedEvent);

  app.get("/api/event/getJoinedEvent/:user_id", controller.getJoinedEvent);

  app.get(
    "/api/event/getRequestedEvent/:user_id",
    controller.getRequestedEvent
  );

  app.get(
    "/api/event/getInterestedEvent/:user_id",
    controller.getInterestedEvent
  );

  app.get(
    "/api/event/getEventParticipantList/:event_id",
    controller.getEventParticipantList
  );

  app.get(
    "/api/event/getParticipantToReview",
    controller.getParticipantToReview
  );

  app.get(
    "/api/event/getUserCateogryInterestEvent/:user_id",
    controller.getUserCateogryInterestEvent
  );

  app.get(
    "/api/event/getEventByCategory/:user_id/:category_id",
    controller.getEventByCategory
  );

  app.get("/api/event/getApproverList",controller.getApproverList);

  app.get("/api/event/getEventCount", controller.getEventCount);

  app.post("/api/event/approving", controller.approving);

  app.post("/api/event/deleteEvent", controller.deleteEvent);

  app.post("/api/event/endEvent", controller.endEvent);
};
