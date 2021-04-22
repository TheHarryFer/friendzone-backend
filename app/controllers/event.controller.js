const Event = require("../models/event.model.js");
const EventParticipant = require("../models/eventParticipant.model.js");
const EventCategory = require("../models/eventCategory.model.js");
const EventGender = require("../models/eventGender.model.js");


function getTimeStamp() {return Math.floor(Date.now() / 1000)}

function createEvent(eventParticipant, event, user_id) {
  eventParticipant.event_id = event.event_id;
  eventParticipant.participant_id = user_id;
  eventParticipant.status_id = "ST12";
  eventParticipant.created_at = getTimeStamp();
  eventParticipant.approved_at = getTimeStamp();

  EventParticipant.create(eventParticipant, (err, eventParticipant) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      Event.updateHost(
        {
          event_id: event.event_id,
          host_id: eventParticipant.event_participant_id,
        },
        (err, result) => {
          if (err) return "err";
          else return "not err"
        }
      );
    }
  });
}

function arrayCategory(event_id, category_id) {
  var eventCategory = [
    event_id = event_id,
    category_id = category_id,
    status = true,
    created_at = getTimeStamp(),
    updated_at = getTimeStamp()
  ];
  return eventCategory;
}

function createCategory(categoryList) {
  EventCategory.create(categoryList, (err, eventCategory) => {
    if (err) return "err"
    else return "not err"
  });
}

function arrayGender(event_id, gender_id) {
  var eventGender = [
    event_id = event_id,
    gender_id = gender_id,
    status = true,
    created_at = getTimeStamp(),
    updated_at = getTimeStamp()
  ];
  return eventGender;
}

function createGender(genderList) {
  EventGender.create(genderList, (err, eventGender) => {
    if (err) return "err"
    else return "not err"
  });
}

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Event.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var event_id = "EV" + count.padStart(6, "0");
      var event = new Event("");
      const user_id = req.body.event.host_id;

      event = req.body.event;
      event.event_id = event_id;
      event.host_id = null;
      event.status_id = "ST14";
      event.created_at = getTimeStamp();
      event.updated_at = getTimeStamp();

      Event.create(event, (err, event) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          if (event.event_id) {
            EventParticipant.getCount((err, count) => {
              if (err) return res.status(500).send({ message: err.message });
              else {
                count++;
                count = count.toString();
                var event_participant_id = "EP" + count.padStart(6, "0");
                var eventParticipant = new EventParticipant("");
                eventParticipant.event_participant_id = event_participant_id;
                if(createEvent(eventParticipant, event, user_id) == "err" ) {
                  res.status(500).send({ message: err.message });
                }
                else {
                  var categoryList = [];
                  req.body.category_id.forEach(category_id => {
                    categoryList.push(arrayCategory(event_id, category_id))
                  });
                  if(createCategory(categoryList) == "err"){ 
                    res.status(500).send({ message: err.message });
                  }
                  else {
                    var genderList = [];
                    req.body.gender_id.forEach(gender_id => {
                      genderList.push(arrayGender(event_id, gender_id))
                    });
                    if(createGender(genderList) == "err"){ 
                      res.status(500).send({ message: err.message });
                    }
                    else {
                       return res
                      .status(200)
                      .send({ message: "Event name : " + event.title + " created" });
                    }
                   
                  }          
                 } 
              }
            });
          }
        }
      });
    }
  });
};
