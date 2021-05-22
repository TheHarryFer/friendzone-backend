const sql = require("./db.connection.js");

// Constructor
const Discount = function (discount) {
  this.discount_id = discount.discount_id;
  this.name = discount.name;
  this.description = discount.description;
  this.discount_pic = discount.discount_pic;
  this.redeem_point = discount.redeem_point;
  this.limits = discount.limits;
  this.period_start = discount.period_start;
  this.period_end = discount.period_end;
  this.expired = discount.expired;
  this.status_id = discount.status_id;
  this.created_at = discount.created_at;
  this.updated_at = discount.updated_at;
};

Discount.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Discount;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      //console.log("Count : ", res[0].count);
      result(null, res[0].count);
      return;
    }
  });
};
Discount.create = (newDiscount, result) => {
  sql.query(`INSERT INTO Discount SET ?`, newDiscount, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    result(null, { ...newDiscount });
  });
};

Discount.uploadDiscountPic = (data, result) => {
  sql.query(
    `UPDATE Discount SET discount_pic = '${data.discount_pic}', updated_at = '${data.updated_at}' WHERE discount_id = '${data.discount_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...data });
    }
  );
};

Discount.getBrowseDiscount = (result) => {
  sql.query(
    `SELECT discount_id, name, description, redeem_point, limits, period_start, period_end, expired
     FROM Discount
     WHERE status_id = 'ST02'
     ORDER BY period_start`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }

      result(null, { message: "not found" });
      return;
    }
  );
};

Discount.getDiscountPicturePath = (discount_id, result) => {
  sql.query(
    `SELECT discount_pic FROM Discount WHERE discount_id = '${discount_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found discount: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found discount with the this discount id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

module.exports = Discount;
