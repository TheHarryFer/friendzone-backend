const { authJwt, auth } = require("../middleware");
const controller = require("../controllers/user.controller.js");

module.exports = function (app) {
  // app.get("/api/user", auth, controller.userInfo);

  // app.post("/api/profile", auth, controller.userBoard);

  app.post("/api/user/editUser", auth, controller.editUser);

  // app.post("/api/changePassword", auth, controller.changePassword);

  app.post("/api/user/uploadPic/img", auth, controller.uploadPic);

  app.get("/api/user/displayPic/:user_id", controller.displayPic);

  app.get("/api/user/getUsername/:user_id", auth, controller.getUsername);

  app.get("/api/user/getUserDetail/:user_id", auth, controller.getUserDetail);
};
