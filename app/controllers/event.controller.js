const Event = require("../models/event.model.js");

function getTimeStamp(){
    return(Math.floor(Date.now()/1000))
  }
  

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
      }
    Event.getCount((err, count) => {
        if (err)
            res.status(500).send({
            message : err.message || "Some error occurred while getting count of the users."
        })
        else {
            count++;
            count = count.toString();
            var user_id = "EV" + count.padStart(6, '0'); 
            console.log("event id " + event_id)
            const event = new Event({
                event_id : event_id,
                host_id : req.body.host_id,
                approver_id : "",
                location : req.body.location,
                event_pic : req.body.event_pic,
                start_at : req.body.start_at,
                end_at : req.body.end_at,
                max_participant : req.body.max_participant,
                min_age : req.body.min_age,
                max_age : req.body.max_age,
                status_id : "ST01",
                created_at : getTimeStamp(),
                updated_at : getTimeStamp()
            })
            Event.create(event,(err, event) => {
                if (err) 
                    return res.status(500).send({ message: err.message });
                if (event)
                    return res.status(200).send({ message: "Event name "+ event.title + "created"});
            })
        }  
    })
};  