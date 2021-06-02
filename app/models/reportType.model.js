const sql = require("./db.connection.js");

const ReportType = function (reportType) {
  this.report_type_id = reportType.report_type_id;
  this.type_name = reportType.type_name;
  this.require_event = reportType.require_event;
  this.require_suspect = reportType.require_suspect;
  this.created_at = reportType.created_at;
  this.updated_at = reportType.updated_at;
};

ReportType.create = (newReportType, result) => {
  sql.query(
    `INSERT INTO ReportType VALUES ?`,
    newReportType,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Created report type : ", { ...newReportType });
      result(null, { ...newReportType });
    }
  );
};

ReportType.getReportTypeUserList = (result) => {
  sql.query(
    `SELECT report_type_id, type_name FROM ReportType WHERE require_suspect = 1`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

ReportType.getReportTypeEventList = (result) => {
  sql.query(
    `SELECT report_type_id, type_name FROM ReportType WHERE require_event = 1`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

ReportType.getReportTypeWebList = (result) => {
  sql.query(
    `SELECT report_type_id, type_name FROM ReportType WHERE require_suspect = 0 AND require_event = 0`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = ReportType;
