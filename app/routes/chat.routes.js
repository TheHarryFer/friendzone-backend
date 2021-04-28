const controller = require("../controllers/chat.controller.js");

module.exports = function (app) {
  //app.post("/api/chat/getEventList", controller.getEventList);

  app.post("/api/chat/create", controller.create);
};
