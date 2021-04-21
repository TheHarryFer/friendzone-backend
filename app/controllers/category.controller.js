const Category = require("../models/category.model.js");
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const _profilePicDir = "./data/category/";
const path = require("path");

function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Category.getCount((err, count) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while getting count of the categories.",
      });
    else {
      count++;
      count = count.toString();
      var category_id = "CA" + count.padStart(2, "0");
      var category = new Category("");
      const timeStamp = getTimeStamp();

      category = req.body;
      category.category_id = category_id;
      category.created_at = timeStamp;
      category.updated_at = timeStamp;

      Category.create(category, (err, category) => {
        if (err) return res.status(500).send({ message: err.message });
        res
          .status(200)
          .send({ message: "Category : " + category.category_name + " created" });
      });
    }
  });
};

exports.getCategoryList = (req, res) => {
  Category.getCategoryList((err, category) => {
    if (err) return res.status(500).send({ message: err.message });
    if (category) return res.status(200).send(category);
  });
};

exports.uploadCategoryIcon = (req, res) => {
  if (req.query.type === "white") {
    fsPromises
      .mkdir(_profilePicDir + req.query.type, { recursive: true }, (err) => {
        console.log("mkdir err -->" + err);
      })
      .then(() => {
        console.log("id: ", req.query.category_id);
        upload(req, res, (err) => {
          if (err) {
            console.log("error by uploading white category icon");
            console.log(err);
            res.status(500).send({ message: err.message });
          } else {
            console.log("id UPLOAD ICON --> " + req.query.category_id);
            res.send({ message: "upload white category icon success" });
          }
        });
      });
  } else if (req.query.type === "black") {
    fsPromises
      .mkdir(_profilePicDir + req.query.type, { recursive: true }, (err) => {
        console.log("mkdir err -->" + err);
      })
      .then(() => {
        console.log("id: ", req.query.category_id);
        upload(req, res, (err) => {
          if (err) {
            console.log("error by uploading black category icon");
            console.log(err);
            res.status(500).send({ message: err.message });
          } else {
            console.log("id UPLOAD ICON --> " + req.query.category_id);
            res.send({ message: "upload black category icon success" });
          }
        });
      });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (req.query.type === "white") {
      Category.uploadWhiteCategoryIcon(
        {
          category_id: req.query.category_id,
          icon_white:
            req.query.type +
            "/" +
            req.query.category_id +
            "-" +
            file.originalname,
          updated_at: getTimeStamp(),
        },
        (err, data) => {
          if (err)
            console.log(
              err.message ||
                "Some error occurred while updating white category icon path."
            );
          else console.log(data);
        }
      );
    } else if (req.query.type === "black") {
      Category.uploadBlackCategoryIcon(
        {
          category_id: req.query.category_id,
          icon_black:
            req.query.type +
            "/" +
            req.query.category_id +
            "-" +
            file.originalname,
          updated_at: getTimeStamp(),
        },
        (err, data) => {
          if (err)
            console.log(
              err.message ||
                "Some error occurred while updating black category icon path."
            );
          else console.log(data);
        }
      );
    }
    callback(null, _profilePicDir + req.query.type);
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, req.query.category_id + "-" + file.originalname);
  },
});

exports.displayCategoryIcon = (req, res) => {
  Category.getCategoryIconPath(req.params.category_id, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (!user)
      return res.status(404).send({ message: "this category is not found" });
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

const upload = multer({ storage: storage }).single("uploadedImages");
