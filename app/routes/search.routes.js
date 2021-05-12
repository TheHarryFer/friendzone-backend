const controller = require("../controllers/search.controller");

module.exports = function (app) {
  app.get("/api/search/:keyword/:user_id", controller.getSearchCount);

  app.get("/api/search/user/:keyword/:user_id", controller.getSearchUser);

  app.get("/api/search/event/:keyword", controller.getSearchEvent);
};
