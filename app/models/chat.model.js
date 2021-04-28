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

module.exports = Chat;
