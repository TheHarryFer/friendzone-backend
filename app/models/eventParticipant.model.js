const sql = require("./db.connection.js");

const EventParticipant = function (eventPaticipant) {
  this.event_participant_id = eventPaticipant.event_participant_id;
  this.event_id = eventPaticipant.event_id;
  this.participant_id = eventPaticipant.participant_id;
  this.status_id = eventPaticipant.status_id;
  this.created_at = eventPaticipant.created_at;
  this.approved_at = eventPaticipant.approved_at;
};

EventParticipant.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM EventParticipant;", (err, res) => {
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

EventParticipant.create = (newEventParticipant, result) => {
  sql.query(`INSERT INTO EventParticipant SET ?`, newEventParticipant, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("Created event participant : ", { ...newEventParticipant });
    result(null, { ...newEventParticipant });
  });
};

module.exports = EventParticipant;