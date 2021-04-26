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

Event.uploadEventPic = (data, result) => {
  sql.query(
    `UPDATE Event SET event_pic = '${data.event_pic}', updated_at = '${data.updated_at}' WHERE event_id = '${data.event_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //console.log("Insert event picture to: ", {...data})
      result(null, { ...data });
    }
  );
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

Event.getEventPicturePath = (event_id, result) => {
  sql.query(
    `SELECT event_pic FROM Event WHERE event_id = '${event_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found event: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found user with the this event id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

Event.getHostedEvent = (user_id, result) => {
  sql.query(
    `SELECT EV.* , US.username,US.user_id, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id) AS joined, COALESCE(UI.interest, 0) AS interest\
    FROM EventParticipant EP\
    LEFT JOIN Event EV\ 
         ON EP.event_participant_id = EV.host_id\
    LEFT JOIN User US\
         ON US.user_id = EP.participant_id\
    LEFT JOIN UserInterest UI\ 
         ON EP.participant_id = UI.user_id AND EV.event_id = UI.event_id\
    WHERE  EP.participant_id = '${user_id}' AND\ 
           EP.status_id = 'ST11' AND \ 
           EV.host_id = EP.event_participant_id\
    GROUP BY EP.event_id , EV.host_id\
  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found event: ", res);
        result(null, res);
        return;
      }

      // not found user with the this user id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

Event.getJoinedEvent = (user_id, result) => {
  sql.query(
    `SELECT EV.* , US.username,US.user_id, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id) AS joined, COALESCE(UI.interest, 0) AS interest\ 
    FROM EventParticipant EP\
    LEFT JOIN Event EV\
         ON EP.event_id = EV.event_id\
    LEFT JOIN EventParticipant HOST\
         ON EV.host_id = HOST.event_participant_id\
    LEFT JOIN UserInterest UI\ 
         ON EP.participant_id = UI.user_id AND EV.event_id = UI.event_id\
    LEFT JOIN User US\
         ON US.user_id = HOST.participant_id\ 		
         
  WHERE  EP.participant_id = '${user_id}' AND\ 
       EP.status_id = 'ST11' AND NOT\ 
       HOST.participant_id = '${user_id}'\
  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found event: ", res);
        result(null, res);
        return;
      }

      // not found user with the this user id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

module.exports = Event;
