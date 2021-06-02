const sql = require("./db.connection.js");

// Constructor
const User = function (user) {
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
};

User.create = (newUser, result) => {
  sql.query(`INSERT INTO User SET ?`, newUser, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    //console.log("Created user : ", { ...newUser });
    result(null, { ...newUser });
  });
};

User.updatePassword = (data, result) => {
  sql.query(
    `UPDATE User SET password = '${data.password}', updated_at = '${data.updated_at}' WHERE user_id = '${data.user_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res) {
        //console.log("Updated password user: ", data.user_id)
        result(null, { message: "password changed" });
      }
    }
  );
};

User.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM User;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      //console.log("Count : " , res[0].count)
      result(null, res[0].count);
      return;
    }
  });
};

User.findByidentification = (identification, result) => {
  sql.query(
    `SELECT * FROM User WHERE username = '${identification}' OR email = '${identification}' OR user_id = '${identification}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found user with the username
      result({ message: "not_found" }, null);
      return;
    }
  );
};

User.uploadProfilePic = (data, result) => {
  sql.query(
    `UPDATE User SET profile_pic = '${data.profile_pic}', updated_at = '${data.updated_at}' WHERE user_id = '${data.user_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //console.log("Insert profile picture to: ", {...data})
      result(null, { ...data });
    }
  );
};

User.IsUserDuplicated = (user, result) => {
  sql.query(
    `SELECT user_id FROM User WHERE username = '${user.username}' OR email = '${user.email}' OR phone = '${user.phone}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        result;
      }
      if (res.length) {
        //console.log("found user: " + res[0].user_id);
        result(null, { message: "Duplicated", user_id: res[0].user_id, exist: true });
        return;
      } else {
        result(null, { message: "Not Duplicated", exist: false });
        return;
      }
    }
  );
};

User.getProfilePicturePath = (user_id, result) => {
  sql.query(
    `SELECT profile_pic FROM User WHERE user_id = '${user_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found user with the this user id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

User.getUser = (user_id, result) => {
  sql.query(
    `SELECT
    US.*,
    (SELECT gender_name FROM Gender WHERE gender_id = US.gender_id) AS gender,
    COALESCE((
      SELECT AVG(rating)
      FROM ParticipantReview
      WHERE participant_id IN (
              SELECT event_participant_id
              FROM EventParticipant
              WHERE participant_id = US.user_id)
      ), 0) AS rating,
      (SELECT COUNT(*)
              FROM EventParticipant EP
              LEFT JOIN Event EV
                     ON EP.event_participant_id = EV.host_id
              LEFT JOIN User US
                     ON US.user_id = EP.participant_id
              WHERE  EP.participant_id = '${user_id}' AND NOT 
                     EP.status_id = 'ST15' AND 
                     EV.host_id = EP.event_participant_id) AS host,
      (SELECT COUNT(*)
              FROM EventParticipant EP
                 LEFT JOIN Event EV
                      ON EP.event_id = EV.event_id
              LEFT JOIN EventParticipant HOST
                     ON EV.host_id = HOST.event_participant_id
                 LEFT JOIN User US
                     ON US.user_id = HOST.participant_id
              WHERE  EP.participant_id = '${user_id}' AND
                     EP.status_id = 'ST11' AND 
                     EV.status_id = 'ST03' AND NOT
                     HOST.participant_id = '${user_id}') AS joined,
      COUNT(IF(FO.follower_id = '${user_id}', IF(FO.status_id = 'ST09',1,NULL), NULL)) AS following,
      COUNT(IF(FO.following_id ='${user_id}', IF(FO.status_id = 'ST09',1,NULL), NULL)) AS follower
  FROM
      Follower FO LEFT JOIN User US ON US.user_id = '${user_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found user with the this user id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

User.editUser = (user, result) => {
  sql.query(
    `Update User Set ? WHERE user_id = "${user.user_id}"`,
    user,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Created user : ", { ...user });
      result(null, { ...user });
    }
  );
};

User.following = (newFollowing, result) => {
  sql.query(
    `INSERT INTO Follower SET ? ON DUPLICATE KEY UPDATE status_id = '${newFollowing.status_id}', updated_at = ${newFollowing.updated_at}`,
    newFollowing,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      result(null, { ...newFollowing });
      return;
    }
  );
};

User.unfollowing = (data, result) => {
  sql.query(
    `UPDATE Follower
     SET status_id = '${data.status_id}', updated_at = ${data.updated_at}
     WHERE follower_id = '${data.follower_id}' AND following_id = '${data.following_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, {message: "unfollow"});
      return;
    }
  );
};
module.exports = User;
