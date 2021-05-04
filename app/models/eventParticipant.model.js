const sql = require("./db.connection.js");

const EventParticipant = function (eventParticipant) {
  this.event_participant_id = eventParticipant.event_participant_id;
  this.event_id = eventParticipant.event_id;
  this.participant_id = eventParticipant.participant_id;
  this.status_id = eventParticipant.status_id;
  this.created_at = eventParticipant.created_at;
  this.approved_at = eventParticipant.approved_at;
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
  sql.query(
    `INSERT INTO EventParticipant SET ?`,
    newEventParticipant,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("Created event participant : ", { ...newEventParticipant });
      result(null, { ...newEventParticipant });
    }
  );
};

EventParticipant.getEventParticipantList = (event_id, result) => {
  sql.query(
    `SELECT
        EP.event_participant_id,
        US.user_id,
        US.username,
        EP.status_id,
        IF(
            COALESCE(EM.event_moderator_id, 0) = EM.event_moderator_id,
            IF(EM.status_id = 'ST03', EM.event_moderator_id, 0),
            0
        ) AS moderator,
        IF(EV.host_id = EP.event_participant_id, 1, 0) AS host
    FROM
        EventParticipant EP
        LEFT JOIN User US ON EP.participant_id = US.user_id
        LEFT JOIN EventModerator EM ON EM.moderator_id = EP.event_participant_id
        LEFT JOIN Event EV ON EP.event_participant_id = EV.host_id
    WHERE
        EP.event_id = '${event_id}'
        AND (
            EP.status_id = 'ST11'
            OR EP.status_id = 'ST13'
        )
    ORDER BY host DESC, moderator DESC, EP.approved_at
    `,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("Found event participant : ", res);
      result(null, res);
    }
  );
};

module.exports = EventParticipant;
