const sql = require("./db.connection.js");

const Search = function (search) {
  this.total = search.total;
  this.friends = search.friends;
  this.events = search.events;
  this.discount = search.discount;
};

Search.getSearchUser = (keyword, user_id, result) => {
  sql.query(
    `SELECT US.user_id, US.bio, US.birthdate, (SELECT gender_name FROM Gender WHERE gender_id = US.gender_id) AS gender, US.username, US.firstname, US.lastname,
    (SELECT COUNT(*) FROM Follower WHERE follower_id = US.user_id AND status_id = 'ST09') AS following, 
    (SELECT COUNT(*) FROM Follower WHERE following_id = US.user_id AND status_id = 'ST09') AS follower,
    (SELECT COUNT(*)
    FROM EventParticipant EP
    LEFT JOIN Event EV
           ON EP.event_participant_id = EV.host_id
    LEFT JOIN User USR
           ON USR.user_id = EP.participant_id
    WHERE  EP.participant_id = US.user_id AND NOT 
           EP.status_id = 'ST15' AND 
           EV.host_id = EP.event_participant_id) AS host,
    (SELECT COUNT(*)
    FROM EventParticipant EP
      LEFT JOIN Event EV
            ON EP.event_id = EV.event_id
    LEFT JOIN EventParticipant HOST
          ON EV.host_id = HOST.event_participant_id
      LEFT JOIN User USR
          ON USR.user_id = HOST.participant_id
    WHERE  EP.participant_id = US.user_id AND
          EP.status_id = 'ST11' AND 
          EV.status_id = 'ST03' AND NOT
          HOST.participant_id = US.user_id) AS joined,
    COALESCE((SELECT AVG(PR.rating) FROM ParticipantReview PR, EventParticipant EP WHERE EP.participant_id = US.user_id AND PR.participant_id = EP.event_participant_id), 0) as rating,
    IF(COALESCE((SELECT F.status_id FROM Follower F WHERE F.follower_id = '${user_id}' AND F.following_id = US.user_id ), 'ST06') = 'ST06' ,0,1) AS status_id
    FROM User US
    WHERE US.username LIKE '%${keyword}%' AND NOT US.user_id = '${user_id}'
    ORDER BY US.created_at`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result(null, []);
        return;
      }
    }
  );
};

Search.getSearchEvent = (keyword, user_id, result) => {
  sql.query(
    `SELECT EV.* , US.username,US.user_id, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id) AS joined, 
    COALESCE((SELECT interest FROM UserInterest WHERE user_id = '${user_id}' AND event_id = EP.event_id ),0) AS interest
    FROM EventParticipant EP
    LEFT JOIN Event EV
        ON EP.event_participant_id = EV.host_id
    LEFT JOIN User US
        ON US.user_id = EP.participant_id
    WHERE title LIKE '%${keyword}%' OR location LIKE '%${keyword}%'
    ORDER BY created_at`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result(null, []);
        return;
      }
    }
  );
};

module.exports = Search;
