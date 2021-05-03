const controller = require("../controllers/chat.controller.js");

module.exports = function (app) {
  app.post("/api/chat/create", controller.create);

  app.get("/api/chat/getChatList/:user_id", controller.getChatList);

  app.get("/api/chat/getChatHead/:event_id", controller.getChatHead);

  app.get("/api/chat/getMessages/:event_id", controller.getMessages);
};
