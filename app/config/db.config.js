const User = require("../models/user.model")

module.exports = {
    HOST : process.env.DB_URL || "localhost",
    USER : "root",
    PASSWORD : "friendzone",
    PORT : 3306,
    DB : "Friendzone",
    dialect : "mysql",
    timeout : 6000000
}