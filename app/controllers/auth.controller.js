const User = require("../models/user.model.js");
const config = require("../config/auth.config");

const { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function getTimeStamp(){
  return(Math.floor(Date.now()/1000))
}

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    })
  }

  User.getCount((err, count) => {
    if (err)
        res.status(500).send({
            message : err.message || "Some error occurred while getting count of the users."
        })
    else {
      count++;
      count = count.toString();
      var user_id = "US" + count.padStart(6, '0');
      var user = new User("");
      const timeStamp = getTimeStamp();

      req.body.password = bcrypt.hashSync(req.body.password, 8);

      user = req.body;
      user.user_id = user_id;
      user.username = user.username.toLowerCase();
      user.email = user.email.toLowerCase();
      user.role_id = "RO04";
      user.status_id = "ST02";
      user.created_at = timeStamp;
      user.updated_at = timeStamp;

      // Save User in the database
      User.create(user, (err, newUser) => {
          if (err)
              res.status(500).send({
                  message : err.message || "Some error occurred while creating the User."
              })
          else {
            const payload = {
              user_id: newUser.user_id,
              role_id: newUser.role_id
            };
    
            var token = jwt.sign(payload, config.secret, {
              expiresIn: 86400, // 24 hours
            // expiresIn: 5,
            });
            res.cookie("user", token, { httpOnly: true, maxAge: 900000 });
    
            res.status(200).send({
              user_id: newUser.user_id,
              token
            });
          }
        })
      }
    })
  };

exports.signin = (req, res) => {
  User.findByidentification(
      req.body.identification, (err, user) => {
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
          role_id: user.role_id
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
};

exports.checkUniqueExists = (req, res) => {
  User.IsUserDuplicated(
    req.body, (err, user) => {
      //console.log(user)
      if (err) 
        return res.status(500).send({ message: err.message });
      if (user)
        return res.status(200).send(user);
      else
        return res.status(404).send(user);
    }
  )
};