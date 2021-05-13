const controller = require("../controllers/search.controller");

module.exports = function (app) {
  app.get("/api/search/user", controller.getSearchUser);

  app.get("/api/search/event", controller.getSearchEvent);
};
