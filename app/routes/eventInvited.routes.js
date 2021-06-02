const controller = require("../controllers/eventInvited.controller.js");

module.exports = function (app) {
  app.post("/api/eventInvited/create", controller.create);

  app.post("/api/eventInvited/acceptedInvited", controller.acceptedInvited);

  app.post("/api/eventInvited/declinedInvited", controller.declinedInvited);

  app.get("/api/eventInvited/getNotification/:user_id", controller.getNotification);
};
