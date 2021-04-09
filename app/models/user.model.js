const sql = require("./db.connection.js");
const $ = require("jquery");


// Constructor
const User = function(user) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.birthdate = user.birthdate;
    this.gender_id = user.gender_id;
    this.phone = user.phone;
    this.profile_pic = user.profile_pic;
    this.bio = user.bio;
    this.role_id = user.role_id;
    this.status_id = user.status_id;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
}

User.create = (newUser, result) => {
    sql.query(`INSERT INTO User SET ${newUser}`, (err, res) => {
        if (err) {
            console.log("error : ",err);
            result(err, null);
            return;
        }

        console.log("Created user : ", { ...newUser });
        result(null, { ...newUser });
    })
}

User.getCount = result => {
      sql.query("SELECT COUNT(*) AS count FROM User;",(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res) {
        console.log("Count : " , res[0].count)
        result(null, res[0].count);
        return;
      }
    })
}

User.findByidentification = (identification, result) => {
    sql.query(`SELECT * FROM User WHERE username = '${identification}' OR email = '${identification}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the username
      result({ message : "not_found" }, null);
      return;
    });
  };

User.uploadProfilePic = (data, result) => {
  sql.query(`UPDATE User SET profile_pic = '${data.path}', updated_at = '${data.updated_at}' WHERE user_id = '${data.user_id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
      return;
    }
    //console.log("Insert profile picture to: ", {...data})
    result(null,{...data});
  })
}

User.IsUserDuplicated = (user, result) => {
  sql.query(`SELECT user_id FROM User WHERE username = '${user.username}' OR email = '${user.email}'`,(err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      result;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the this email
    result({ message : "not_found" }, null);
    return;
  })
}

User.getProfilePicturePath = (user_id, result) => {
  sql.query(`SELECT profile_pic FROM User WHERE user_id = '${user_id}'`, (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the this user id 
    result({ message : "not_found" }, null);
    return;
  })
}
  
module.exports = User;