const Event = require("../models/event.model.js");
const EventParticipant = require("../models/eventParticipant.model.js");
const EventCategory = require("../models/eventCategory.model.js");
const EventGender = require("../models/eventGender.model.js");
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const _eventPicDir = "./data/event/";
const path = require("path");

function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

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
          else return "not err";
        }
      );
    }
  });
}

function arrayCategory(event_id, category_id) {
  var eventCategory = [
    (event_id = event_id),
    (category_id = category_id),
    (status = true),
    (created_at = getTimeStamp()),
    (updated_at = getTimeStamp()),
  ];
  return eventCategory;
}

function createCategory(categoryList) {
  EventCategory.create(categoryList, (err, eventCategory) => {
    if (err) return "err";
    else return "not err";
  });
}

function arrayGender(event_id, gender_id) {
  var eventGender = [
    (event_id = event_id),
    (gender_id = gender_id),
    (status = true),
    (created_at = getTimeStamp()),
    (updated_at = getTimeStamp()),
  ];
  return eventGender;
}

function createGender(genderList) {
  EventGender.create(genderList, (err, eventGender) => {
    if (err) return "err";
    else return "not err";
  });
}

exports.uploadEventPic = (req, res) => {
  fsPromises
    .mkdir(_eventPicDir + req.query.event_id, { recursive: true }, (err) => {
      console.log("mkdir err -->" + err);
    })
    .then(() => {
      console.log("id: ", req.query.event_id);
      upload(req, res, (err) => {
        if (err) {
          console.log("error by uploading IMG");
          res.status(500).send({ message: err.message });
        } else {
          console.log("id UPLOAD IMG --> " + req.query.event_id);
          res.send({ message: "upload event picture success" });
        }
      });
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    Event.uploadEventPic(
      {
        event_id: req.query.event_id,
        event_pic:
          req.query.event_id +
          "/" +
          req.query.event_id +
          "-" +
          file.originalname,
        updated_at: getTimeStamp(),
      },
      (err, data) => {
        if (err) return res.status(500).send({ message: err.message });
        else console.log(data);
      }
    );
    callback(null, _eventPicDir + req.query.event_id);
  },
  filename: function (req, file, callback) {
    callback(null, req.query.event_id + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("uploadedImages");

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
      var roles = req.body.role_id;
      const user_id = req.body.event.host_id;
      event = req.body.event;

      if (roles.includes("RO01") || roles.includes("RO03")) {
        event.approver_id = req.body.user_id;
        event.status_id = "ST03";
      } else {
        event.status_id = "ST14";
      }

      event.event_id = event_id;
      event.host_id = null;
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
                if (createEvent(eventParticipant, event, user_id) == "err") {
                  res.status(500).send({ message: err.message });
                } else {
                  var categoryList = [];
                  req.body.category_id.forEach((category_id) => {
                    categoryList.push(arrayCategory(event_id, category_id));
                  });
                  if (createCategory(categoryList) == "err") {
                    res.status(500).send({ message: err.message });
                  } else {
                    var genderList = [];
                    req.body.gender_id.forEach((gender_id) => {
                      genderList.push(arrayGender(event_id, gender_id));
                    });
                    if (createGender(genderList) == "err") {
                      res.status(500).send({ message: err.message });
                    } else {
                      return res.status(200).send({
                        event_id: event_id,
                      });
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

exports.displayPic = (req, res) => {
  Event.getEventPicturePath(req.params.event_id, (err, event) => {
    if (err) return res.status(500).send({ message: err.message });
    if (!event)
      return res.status(404).send({ message: "this event is not found" });
    else {
      let fileType = path.extname(event.event_pic);

      if (fileType === ".png") contentType = "image/png";
      else if (fileType === ".jpg") contentType = "image/jpg";
      else if (fileType === ".jpeg") contentType = "image/jpeg";
      else contentType = "text/plain";

      fs.readFile(_eventPicDir + event.event_pic, function (error, content) {
        if (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal server error");
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    }
  });
};

exports.getHostedEvent = (req, res) => {
  Event.getHostedEvent(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    if (result)
      return res.status(200).send({
        username: result.username,
        event_id: result.event_id,
        title: result.title,
        description: result.description,
        location: result.location,
        start,
      });
  });
};
