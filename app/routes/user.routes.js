const { authJwt, auth } = require("../middleware");
const controller = require("../controllers/user.controller.js");

module.exports = function(app) {
  	// app.get("/api/user", auth, controller.userInfo);

  	// app.post("/api/profile", auth, controller.userBoard);

  	// app.post("/api/edit", auth, controller.editData);

  	// app.post("/api/changePassword", auth, controller.changePassword);

  	//app.post("/api/uploadPic/img", auth,controller.uploadPic);

  	app.get("/api/displayPic/:user_id", controller.displayPic);

	app.get("/api/getUsername/:user_id", controller.getUsername);
	
	app.get("/api/getUserDetail/:user_id", controller.getUserDetail);
};