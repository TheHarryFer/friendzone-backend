const sql = require("./db.connection.js");

const UserRole = function (userRole) {
  this.user_id = userRole.user_id;
  this.role_id = userRole.role_id;
  this.status = userRole.status;
  this.created_at = userRole.created_at;
  this.updated_at = userRole.updated_at;
};

UserRole.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM UserRole;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      //console.log("Count : ", res[0].count);
      result(null, res[0].count);
      return;
    }
  });
};

UserRole.create = (newUserRole, result) => {
  sql.query(
    `INSERT INTO UserRole SET ?`,
    newUserRole,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Created user role : ", { ...newUserRole });
      result(null, { ...newUserRole });
    }
  );
};

UserRole.getUserRoles = (user_id, result) => {
  sql.query(
    `SELECT role_id FROM UserRole WHERE user_id = '${user_id}' AND status = TRUE`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Found user roles : ", res);
      result(null, res);
    }
  );
};

module.exports = UserRole;