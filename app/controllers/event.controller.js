const Event = require("../models/event.model.js");
const EventParticipant = require("../models/eventParticipant.model.js");

function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Event.getCount((err, count) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while getting count of the events.",
      });
    else {
      count++;
      count = count.toString();
      var event_id = "EV" + count.padStart(6, "0");
      var event = new Event("");
      const timeStamp = getTimeStamp();
      const user_id = req.body.host_id;

      event = req.body;
      event.event_id = event_id;
      event.host_id = null;
      event.status_id = "ST14";
      event.created_at = timeStamp;
      event.updated_at = timeStamp;

      Event.create(event, (err, event) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          if (event.event_id) {
            EventParticipant.getCount((err, count) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while getting count of the events.",
                });
              else {
                count++;
                count = count.toString();
                var event_participant_id = "EP" + count.padStart(6, "0");
                var eventParticipant = new EventParticipant("");
                const timeStamp = getTimeStamp();

                eventParticipant.event_participant_id = event_participant_id;
                eventParticipant.event_id = event.event_id;
                eventParticipant.participant_id = user_id;
                eventParticipant.status_id = "ST12";
                eventParticipant.created_at = timeStamp;
                eventParticipant.approved_at = timeStamp;

                EventParticipant.create(eventParticipant, (err, eventParticipant) => {
                  if (err) return res.status(500).send({ message: err.message });
                  else {
                    Event.updateHost({ event_id : event.event_id, host_id: eventParticipant.event_participant_id}, (err, result) => {
                      if (err) return res.status(500).send({ message: err.message });
                      else return res
                      .status(200)
                      .send({ message: "Event name : " + event.title + " created" });
                    })
                  }
                });
              }
            });
          }
        }
      });
    }
  });
};
