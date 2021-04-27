const sql = require("./db.connection.js");

const UserInterest = function (userInterest) {
  this.user_id = userInterest.user_id;
  this.event_id = userInterest.event_id;
  this.interest = userInterest.interest;
  this.created_at = userInterest.created_at;
  this.updated_at = userInterest.updated_at;
};

UserInterest.create = (newUserInterest, result) => {
  console.log(newUserInterest)
  sql.query(`INSERT INTO UserInterest SET ?`, newUserInterest, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    //console.log("Created user interest : ", { ...newUserInterest });
    result(null, { ...newUserInterest });
  });
};

UserInterest.update = (userInterest, result) => {
  sql.query(`UPDATE UserInterest SET interest = ${userInterest.interest}\
              WHERE user_id = '${userInterest.user_id}'\
              AND event_id = '${userInterest.event_id}'`, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    result(null, { message: "Updated user interest successfully" });
  });
};

UserInterest.findExist = (data, result) => {
  sql.query(
    `SELECT * FROM UserInterest WHERE user_id = '${data.user_id}' AND event_id = '${data.event_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("Found user interest : " + res);
        result(null, { exist: true });
        return;
      } else {
        //console.log("Not found user interest");
        result(null, { exist: false });
        return;
      }
    }
  );
};

module.exports = UserInterest;
