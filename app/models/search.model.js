const sql = require("./db.connection.js");

const Search = function (search) {
  this.total = search.total;
  this.friends = search.friends;
  this.events = search.events;
  this.discount = search.discount;
};


Search.getSearchUser = (keyword, user_id, result) => {
  sql.query(
    `SELECT US.user_id, US.username, US.bio,
    (SELECT COUNT(*) FROM Follower WHERE Follower_id = US.user_id) AS Follower, 
      (SELECT COUNT(*) FROM Follower WHERE Following_id = US.user_id) AS Following,
      (SELECT COUNT(*) FROM Event EV, EventParticipant EP WHERE EP.participant_id = US.user_id AND EP.event_participant_id = EV.host_id) as host, 
      COALESCE((SELECT ROUND(AVG(PR.rating)) FROM ParticipantReview PR, EventParticipant EP WHERE EP.participant_id = US.user_id AND PR.participant_id = EP.event_participant_id),5) as rating,
      IF(COALESCE((SELECT status_id FROM Follower WHERE US.user_id = follower_id), 'ST06') = 'ST06' ,0,1) AS status_id
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
      }
      else {
        result(null, []) 
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
      }
      else {
        result(null, [])
        return;
      }
    }
  );
};

module.exports = Search;
