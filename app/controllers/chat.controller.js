const Chat = require("../models/chat.model.js");

function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Content can not be empty!",
        });
    }

    Chat.getCount((err, count) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
            count++;
            count = count.toString();
            var chat_id = "CH" + count.padStart(6, "0");
            var chat = new Chat("");
            chat.chat_id = chat_id;
            chat.sender_id = req.body.sender_id;
            chat.event_id = req.body.event_id;
            chat.message = req.body.message;
            chat.created_at = getTimeStamp();
            chat.updated_at = getTimeStamp();
            Chat.create(chat, (err, result) => {
                if (err) return res.status(500).send({ message: err.message });
                else return res.status(200).send({message:"chat created"})
            });
        }
    });
};