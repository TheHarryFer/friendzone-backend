const sql = require("./db.connection.js");

const Event = function (event) {
  this.event_id = event.event_id;
  this.host_id = event.host_id;
  this.approver_id = event.approver_id;
  this.title = event.title;
  this.description = event.description;
  this.location = event.location;
  this.event_pic = event.event_pic;
  this.start_at = event.start_at;
  this.end_at = event.end_at;
  this.max_participant = event.max_participant;
  this.min_age = event.min_age;
  this.max_age = event.max_age;
  this.status_id = event.status_id;
  this.created_at = event.created_at;
  this.updated_at = event.updated_at;
};

Event.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Event;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("Count : ", res[0].count);
      result(null, res[0].count);
      return;
    }
  });
};

Event.create = (newEvent, result) => {
  sql.query(`INSERT INTO Event SET ?`, newEvent, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("Created event : ", { ...newEvent });
    result(null, { ...newEvent });
  });
};

Event.updateHost = (data, result) => {
  sql.query(
    `Update Event SET host_id = "${data.host_id}" WHERE event_id = "${data.event_id}"`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated event : ", { ...data });
      result(null, res[0]);
    }
  );
};

module.exports = Event;