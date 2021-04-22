const User = require("../models/user.model.js");
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const _profilePicDir = "./data/profilePic/";
const path = require("path");

function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

exports.uploadPic = (req, res) => {
  fsPromises
    .mkdir(_profilePicDir + req.query.user_id, { recursive: true }, (err) => {
      console.log("mkdir err -->" + err);
    })
    .then(() => {
      console.log("id: ", req.query.user_id);
      upload(req, res, (err) => {
        if (err) {
          console.log("error by uploading IMG");
          console.log(err);
          res.status(500).send({ message: err.message });
        } else {
          console.log("id UPLOAD IMG --> " + req.query.user_id);
          res.send({ message: "upload image success" });
        }
      });
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    User.uploadProfilePic(
      {
        user_id: req.query.user_id,
        profile_pic:
          req.query.user_id + "/" + req.query.user_id + "-" + file.originalname,
        updated_at: getTimeStamp(),
      },
      (err, data) => {
        if (err) return res.status(500).send({ message: err.message });
        else console.log(data);
      }
    );
    callback(null, _profilePicDir + req.query.user_id);
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, req.query.user_id + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("uploadedImages");

exports.displayPic = (req, res) => {
  User.getProfilePicturePath(req.params.user_id, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (!user)
      return res.status(404).send({ message: "this user is not found" });
    else {
      let fileType = path.extname(user.profile_pic);

      if (fileType === ".png") contentType = "image/png";
      else if (fileType === ".jpg") contentType = "image/jpg";
      else if (fileType === ".jpeg") contentType = "image/jpeg";
      else contentType = "text/plain";

      fs.readFile(_profilePicDir + user.profile_pic, function (error, content) {
        if (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal server error");
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    }
  });
};

exports.getUsername = (req, res) => {
  User.getUser(req.params.user_id, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (user) return res.status(200).send({ username: user.username });
  });
};

exports.getUserDetail = (req, res) => {
  User.getUser(req.params.user_id, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (user)
      return res.status(200).send({
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        gender_id: user.gender_id,
        birthdate: user.birthdate,
        profile_pic: user.profile_pic,
        bio: user.bio,
      });
  });
};

exports.editUser = (req, res) => {
  User.editUser(req.body, (err, message) => {
    if (err) return res.status(500).send({ message: err.message });
    if (message) return res.status(200).send({ message: message });
  });
};
