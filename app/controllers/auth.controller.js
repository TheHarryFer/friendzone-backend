const User = require("../models/user.model.js");
const config = require("../config/auth.config");

//const { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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

  function getTimeStamp(){
    return(Math.floor(Date.now()/1000))
  }

  // Running user_id
  
  var user_id = User.getCount((err, data) => {
    if (err)
        res.status(500).send({
            message : err.message || "Some error occurred while getting count of the users."
        })
    else {
      data++;
      var user_id = "" + data;
      user_id = "US" + user_id.padStart(6, '0');
      console.log(user_id);
      return user_id;
    }
  });
  
  // Hash User's password
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  // Create a User
  const user = new User({
      user_id : "US000001",
      username : req.body.username,
      password : req.body.password,
      email : req.body.email,
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      birthdate : req.body.birthdate,
      gender_id : req.body.gender_id,
      phone : req.body.phone,
      profile_pic : req.body.profile_pic,
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
};

exports.signin = (req, res) => {
  User.findByUsername(
      req.body.username, (err, user) => {
      if (err)
        res.status(500).send({ message: err.message });
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      else {
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

// exports.checkEmailExists = (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   }).then((user) => {
//     if (user) {
//       res.status(404).send({ message: "Email duplicate" });
//     } else {
//       res.status(200).send({ message: "Email is not duplicated" });
//     }
//   });
// };
