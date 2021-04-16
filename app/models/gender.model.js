const sql = require("./db.connection.js");

const Gender = function(gender) {
    this.gender_id = gender.gender_id;
    this.gender_name = gender.gender_name;
}
Gender.getGenderList = result => {
    sql.query(`SELECT gender_id, gender_name FROM Gender`, (err, res) => {
        if (err) {
            console.log("error : ",err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Gender;