const sql = require("./db.connection.js");

const EventCategory = function (event) {
  this.event_id = event.event_id;
  this.category_id = event.category_id;
  this.status = event.status;
  this.created_at = event.created_at;
  this.updated_at = event.updated_at;
};

EventCategory.create = (newEventCategory, result) => {
  sql.query(`INSERT INTO EventCategory VALUES ?`, [newEventCategory], (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    //console.log("Created event category : ", { ...newEventCategory });
    result(null, { ...newEventCategory });
  });
};

module.exports = EventCategory;
