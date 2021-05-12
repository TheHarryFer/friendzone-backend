const sql = require("./db.connection.js");

const Search = function (search) {
  this.total = search.total;
  this.friends = search.friends;
  this.events = search.events;
  this.discount = search.discount;
};

const ProfileResult = function (profileResult) {
  this.user_id = profileResult.user_id;
  this.username = profileResult.username;
  this.follower = profileResult.Follower;
  this.follooo;
};

Search.getSearchCount = (search, result) => {
  sql.query(
    `(SELECT COUNT(*) as count FROM User WHERE username LIKE '${search}%') 
     UNION ALL
     (SELECT COUNT(*) as count FROM Event WHERE title LIKE '${search}%')
     UNION ALL
     (SELECT COUNT(*) as count FROM Discount WHERE name LIKE '${search}%')`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Search;
