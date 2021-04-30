const sql = require("./db.connection.js");

const EventGender = function (event) {
  this.event_id = event.event_id;
  this.gender_id = event.gender_id;
  this.status = event.status;
  this.created_at = event.created_at;
  this.updated_at = event.updated_at;
};

EventGender.create = (newEventGender, result) => {
  sql.query(
    `INSERT INTO EventGender VALUES ?`,
    [newEventGender],
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      result(null, { ...newEventGender });
    }
  );
};

EventGender.getEventGenderList = (event_id, result) => {
  sql.query(
    `SELECT GE.gender_name
      FROM EventGender EG
      LEFT JOIN Gender GE 
        ON EG.gender_id = GE.gender_id
      LEFT JOIN Event EV 
        ON EV.event_id = EG.event_id 
      WHERE EV.event_id = '${event_id}'
      `,
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

module.exports = EventGender;
