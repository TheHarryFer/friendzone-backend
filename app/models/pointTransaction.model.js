const sql = require("./db.connection.js");

// Constructor
const PointTransaction = [];

PointTransaction.getPoint = (user_id , result) => {
    sql.query(
      ` SELECT COALESCE(SUM(amount),0) AS point
        FROM PointTransaction 
        LEFT JOIN EventParticipant EP 
                ON EP.participant_id = '${user_id}' 
        LEFT JOIN UserDiscount UD 
                ON UD.user_id = '${user_id}' `,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          result(null, res[0]);
          return;
        }
        return;
      }
    );
  };

  module.exports = PointTransaction;
