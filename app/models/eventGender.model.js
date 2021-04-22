const sql = require("./db.connection.js");

const EventGender = function (event) {
  this.event_id = event.event_id;
  this.gender_id = event.gender_id;
  this.status = event.status;
  this.created_at = event.created_at;
  this.updated_at = event.updated_at;
};

EventGender.create = (newEventGender, result) => {
  sql.query(`INSERT INTO EventGender VALUES ?`, [newEventGender], (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    result(null, { ...newEventGender });
  });
};

module.exports = EventGender;
