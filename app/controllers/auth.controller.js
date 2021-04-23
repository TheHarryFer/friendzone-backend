const User = require("../models/user.model.js");
const UserRole = require("../models/userRole.model.js");
const config = require("../config/auth.config");

const { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var user_id = "US" + count.padStart(6, "0");
      var user = new User("");

      req.body.password = bcrypt.hashSync(req.body.password, 8);

      user = req.body;
      user.user_id = user_id;
      user.username = user.username.toLowerCase();
      user.email = user.email.toLowerCase();
      user.status_id = "ST02";
      user.created_at = getTimeStamp();
      user.updated_at = getTimeStamp();

      // Save User in the database
      User.create(user, (err, user) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          if (user.user_id) {
            var userRole = new UserRole("");

            userRole.user_id = user.user_id;
            userRole.role_id = ["RO04"];
            userRole.status = true;
            userRole.created_at = getTimeStamp();
            userRole.updated_at = getTimeStamp();

            UserRole.create(userRole, (err, userRole) => {
              if (err) return res.status(500).send({ message: err.message });
              else {
                const payload = {
                  user_id: user.user_id,
                  role_id: userRole.role_id
                };

                var token = jwt.sign(payload, config.secret, {
                  expiresIn: 86400, // 24 hours
                // expiresIn: 5,
                });
                res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

                res.status(200).send({
                  user_id: user.user_id,
                  token
                });
              }
            })
          }
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findByidentification(req.body.identification, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    } else {
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

      UserRole.getUserRoles(user.user_id, (err, userRoles) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          var userRolesArr = [];

          userRoles.forEach(role => {
            userRolesArr.push(role.role_id);
          });

          const payload = {
            user_id: user.user_id,
            role_id: userRolesArr
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
    }
  });
};

exports.checkUniqueExists = (req, res) => {
  User.IsUserDuplicated(req.body, (err, user) => {
    //console.log(user)
    if (err) return res.status(500).send({ message: err.message });
    if (user) return res.status(200).send(user);
    else return res.status(404).send(user);
  });
};
