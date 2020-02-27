//this file initializes the database connection.  Then can be accessable from any other file
const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuid/v4');
let db = new sqlite3.Database('database/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err);
    }
    console.log("Connected to Database");
});

module.exports = { db, uuid };