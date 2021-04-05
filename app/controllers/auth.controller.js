const User = require("../models/user.model.js");
const config = require("../config/auth.config");
const multer = require('multer');
const fs = require('fs')
const async = require('async')
const fsPromises = fs.promises
const _profilePicDir = './data/profilePic/'


//const { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function getTimeStamp(){
  return(Math.floor(Date.now()/1000))
}

exports.signup = (req, res) => {
  /* const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } */
  
  // Validate request
  if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    })
  }
  // Running user_id
  // async function newUserID() {
  //   let count = await getCountFromUser();
  //   // let user_id = await createId(count);
  //   return count;
  // }
  // function createId(count) {
  //   console.log(count)
  //   count++;
  //   count = count.toString();
  //   var temp;
  //   for(i = 0; i < 6 - count.length ; i++) {
  //       temp = temp + "0"
  //   }
  //   var user_id = "US" + temp + count; 
  //   console.log(user_id)
  //   return user_id;
  // }
  //function getCountFromUser() {
    User.getCount((err, count) => {
      if (err)
          res.status(500).send({
              message : err.message || "Some error occurred while getting count of the users."
          })
      else {
        console.log("count" + count)
        count++;
        count = count.toString();
        var user_id = "US" + count.padStart(6, '0'); 
        console.log("user_id" + user_id)
          // Hash User's password
        req.body.password = bcrypt.hashSync(req.body.password, 8);

        // Create a User
        const user = new User({
            user_id : user_id,
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            birthdate : req.body.birthdate,
            gender_id : req.body.gender_id,
            phone : req.body.phone,
            bio : req.body.bio,
            role_id : "RO01",
            status_id : "ST01",
            created_at : getTimeStamp(),
            updated_at : getTimeStamp()
        })

        // Save User in the database
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message : err.message || "Some error occurred while creating the User."
                })
            else
                res.send(data);
        })
        
      }
    })/* .then(() => {
      console.log("count" + count)
      count++;
      count = count.toString();
      var temp;
      for(i = 0; i < 6 - count.length ; i++) {
          temp = temp + "0"
      }
      var user_id = "US" + temp + count; 
      console.log("user_id" + user_id)
      return user_id;
    }) */
  //}
};

exports.signin = (req, res) => {
  User.findByUsername(
      req.body.username, (err, user) => {
      if (err)
        return res.status(500).send({ message: err.message });
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      else {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
        
        const payload = {
          user_id: user.user_id,
          username: user.username,
        };

        var token = jwt.sign(payload, config.secret, {
          expiresIn: 86400, // 24 hours
        // expiresIn: 5,
        });
        res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

        res.status(200).send({
          token,
        });
      }
  })
     /* .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      
      const payload = {
        user_id: user.user_id,
        username: user.username,
      };

      var token = jwt.sign(payload, config.secret, {
        expiresIn: 86400, // 24 hours
       // expiresIn: 5,
      });
      res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

      res.status(200).send({
        token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });  */
};

exports.checkEmailExists = (req, res) => {
  User.IsEmailDup(
    req.body.email, (err, user) => {
      if (err) 
        return res.status(500).send({ message: err.message });
      if (user)
        return res.status(404).send({ message: "Email duplicated"});
      else 
        return res.status(200).send({message: "Email is not duplicated"});
    }
  )
};

exports.uploadPic = (req, res) => {
  fsPromises.mkdir(_profilePicDir + req.query.user_id, { recursive: true }, (err) => {
    console.log('mkdir err -->' + err);
  }).then(() => {
    console.log("id: ",req.query.user_id);
    upload(req, res, (err) => {
      if (err) {
        console.log('error by uploading IMG');
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      else {
        console.log('id UPLOAD IMG --> ' + req.query.user_id);
        res.send({ message: "upload image success" })
      }
    });
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    User.uploadProfilePic({
      user_id : req.query.user_id,
      path : req.query.user_id + "/" + req.query.user_id + "-" + file.originalname,
      updated_at : getTimeStamp()
      }, (err, data) => {
        if (err)
          console.log(err.message || "Some error occurred while updating profile picture path.");
        else
          console.log(data);
    });
    callback(null, _profilePicDir + req.query.user_id); //will automate catagory
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, req.query.user_id + '-' + file.originalname);
    }
  });
  // Function to upload images
const upload = multer({storage: storage}).single('uploadedImages');
