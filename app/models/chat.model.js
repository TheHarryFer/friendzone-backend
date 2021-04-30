const sql = require("./db.connection.js");

const Chat = function (chat) {
  this.chat_id = chat.chat_id;
  this.sender_id = chat.sender_id;
  this.event_id = chat.event_id;
  this.message = chat.message;
  this.created_at = chat.created_at;
  this.updated_at = chat.updated_at;
};

Chat.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Chat;", (err, res) => {
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

Chat.create = (newChat, result) => {
  sql.query(
    `  
    INSERT INTO Chat (chat_id, sender_id, message, created_at, updated_at) VALUES\
                     ('${newChat.chat_id}', (SELECT event_participant_id FROM EventParticipant EP WHERE EP.participant_id = '${newChat.sender_id}' AND EP.event_id = '${newChat.event_id}'), '${newChat.message}', '${newChat.created_at}', '${newChat.updated_at}');`,
    
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("Created chat : ", { ...newChat });
      result(null, { ...newChat });
    }
  );
};




Chat.getChatList = (user_id, result) => {
  sql.query(
    `SELECT EV.title,EV.event_id ,(SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id) AS joined, 
    EV.max_participant, 
    (SELECT CH.message
         FROM Chat CH
         WHERE CH.sender_id = EP.event_participant_id
         ORDER BY CH.created_at DESC
         LIMIT 1 ) AS message, 
     
     (SELECT SENDER.participant_id
    FROM Chat CH, EventParticipant SENDER		
    WHERE CH.sender_id = SENDER.event_participant_id AND 
      CH.sender_id = EP.event_participant_id
    ORDER BY CH.created_at DESC
    LIMIT 1 ) AS sender_id 
                  
    FROM EventParticipant EP 
    LEFT JOIN Event EV 
    ON EV.event_id = EP.event_id
    WHERE EP.participant_id = '${user_id}'
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
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Chat.getChatHead = (event_id, result) => {
  sql.query(
  `SELECT EV.title, US.username, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id) AS joined, EV.max_participant
      FROM Event EV
      LEFT JOIN EventParticipant EP  
        ON EV.event_id = EP.event_id
      LEFT JOIN User US 
        ON US.user_id = EP.participant_id
        
    WHERE EV.event_id = '${event_id}' AND 
        EV.host_id = EP.event_participant_id
        '
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
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};


Chat.getChatHead = (event_id, result) => {
  sql.query(
  `SELECT EV.title, US.username, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id) AS joined, EV.max_participant
      FROM Event EV
      LEFT JOIN EventParticipant EP  
        ON EV.event_id = EP.event_id
      LEFT JOIN User US 
        ON US.user_id = EP.participant_id
        
    WHERE EV.event_id = '${event_id}' AND 
        EV.host_id = EP.event_participant_id
        '
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
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};


module.exports = Chat;
