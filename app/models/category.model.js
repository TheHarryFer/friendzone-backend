const sql = require("./db.connection.js");

const Category = function (category) {
  this.category_id = category.category_id;
  this.category_name = category.category_name;
  this.icon_white = category.icon_white;
  this.icon_black = category.icon_black;
  this.color_code = category.color_code;
  this.created_at = category.created_at;
  this.updated_at = category.updated_at;
};

Category.create = (newCategory, result) => {
  sql.query(`INSERT INTO Category SET ?`, newCategory, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("Created category : ", { ...newCategory });
    result(null, { ...newCategory });
  });
};

Category.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Category;", (err, res) => {
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

Category.getCategoryList = (result) => {
  sql.query(
    `SELECT category_id, category_name, category_icon, color_code FROM Category`,
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

Category.uploadWhiteCategoryIcon = (data, result) => {
  sql.query(
    `UPDATE Category SET icon_white = '${data.icon_white}', updated_at = '${data.updated_at}' WHERE category_id = '${data.category_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Insert white category icon to: ", { ...data });
      result(null, { ...data });
    }
  );
};

Category.uploadBlackCategoryIcon = (data, result) => {
  sql.query(
    `UPDATE Category SET icon_black = '${data.icon_black}', updated_at = '${data.updated_at}' WHERE category_id = '${data.category_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Insert black category icon to: ", { ...data });
      result(null, { ...data });
    }
  );
};

module.exports = Category;
