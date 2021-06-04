const { auth } = require("../middleware");
const controller = require("../controllers/user.controller.js");

module.exports = function (app) {
  app.post("/api/user/changePassword", auth, controller.changePassword);

  app.post("/api/user/editUser", auth, controller.editUser);

  app.post("/api/user/updateUserCategory", auth, controller.updateUserCategory);

  app.post("/api/user/uploadPic/img", auth, controller.uploadPic);

  app.get("/api/user/displayPic/:user_id",controller.displayPic);

  app.get("/api/user/getUsername/:user_id", controller.getUsername);

  app.get("/api/user/getUserDetail/:user_id", controller.getUserDetail);

  app.post("/api/user/findByUsername", controller.findByUsername);

  app.post("/api/user/following", controller.following);

  app.post("/api/user/unfollowing", controller.unfollowing);
};
