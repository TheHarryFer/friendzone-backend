const controller = require("../controllers/search.controller");

module.exports = function (app) {
  app.get("/api/search/userToInvite", controller.getSearchUserToInvite);

  app.get("/api/search/user", controller.getSearchUser);

  app.get("/api/search/event", controller.getSearchEvent);

  app.get("/api/search/discount", controller.getSearchDiscount);
};
