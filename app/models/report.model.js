const sql = require("./db.connection.js");

// Constructor
const Report = function (report) {
  this.report_id = report.report_id;
  this.reporter_id = report.reporter_id;
  this.report_type_id = report.report_type_id;
  this.title = report.title;
  this.description = report.description;
  this.event_id = report.event_id;
  this.suspect_id = report.suspect_id;
  this.admin_id = report.admin_id;
  this.status_id = report.status_id;
  this.created_at = report.created_at;
  this.updated_at = report.updated_at;
};

Report.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Report;", (err, res) => {
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

Report.create = (newReport, result) => {
  sql.query(`INSERT INTO Report SET ?`, newReport, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    result(null, { ...newReport });
  });
};

module.exports = Report;