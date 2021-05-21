const Discount = require("../models/discount.model.js");
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const _discountPicDir = "./data/discount/";
const path = require("path");

function getTimeStamp() {
    return new Date().getTime();
}

exports.uploadDiscountPic = (req, res) => {
    fsPromises
      .mkdir(_discountPicDir + req.query.discount_id, { recursive: true }, (err) => {
        console.log("mkdir err -->" + err);
      })
      .then(() => {
        console.log("id: ", req.query.discount_id);
        upload(req, res, (err) => {
          if (err) {
            console.log("error by uploading IMG");
            res.status(500).send({ message: err.message });
          } else {
            console.log("id UPLOAD IMG --> " + req.query.discount_id);
            res.send({ message: "upload discount picture success" });
          }
        });
      });
  };
  
const storage = multer.diskStorage({
destination: function (req, file, callback) {
    Discount.uploadDiscountPic(
      {
        discount_id: req.query.discount_id,
        discount_pic:
        req.query.discount_id +
        "/" +
        req.query.discount_id +
        "-" +
        file.originalname,
        updated_at: getTimeStamp()
      },
      (err, data) => {
      if (err) return res.status(500).send({ message: err.message });
      else console.log(data);
      }
    );
    callback(null, _discountPicDir + req.query.discount_id);
  },
  filename: function (req, file, callback) {
    callback(null, req.query.discount_id + "-" + file.originalname);
  }
});
  
const upload = multer({ storage: storage }).single("uploadedImages");

exports.create = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  
    Discount.getCount((err, count) => {
      if (err) return res.status(500).send({ message: err.message });
      else {
        count++;
        count = count.toString();
        var discount_id = "DC" + count.padStart(6, "0");
        var discount = new Discount("");
        discount.discount_id = discount_id;
        discount.name = req.body.name;
        discount.description = req.body.description;
        discount.redeem_point = req.body.redeem_point;
        discount.limits = req.body.limits; 
        discount.period_start = req.body.period_start;
        discount.period_end = req.body.period_end;
        discount.expired = req.body.expired;
        discount.status_id = "ST02"
        discount.created_at = getTimeStamp();
        discount.updated_at = getTimeStamp();
        Discount.create(discount, (err, result) => {
          if (err) return res.status(500).send({ message: err.message });
          else return res.status(200).send({discount_id : result.discount_id});
        });
      }
    });
  };

  