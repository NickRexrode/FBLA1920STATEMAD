var express = require('express');
var router = express.Router();
let db = require('../database/database.js').db;
var uuid = require('../database/database.js').uuid;
router.use(express.json());

//makes the logged in user leave their chapter
router.delete('/:uuid', function (req, res) {
    if (!req.params.uuid) {
        res.status(400).json({});;
        return;
    }
    var stmt = db.prepare(`UPDATE people SET chapter = "" WHERE uuid = "${req.params.uuid}"`);
    stmt.run();
    res.status(200).json({});

})
// Creates a new person.  Has many branches.  When you create an account, a password is needed.  
//If there is no password, the backend assumes you are just managing a name for attendence purposes.
router.post('/', function (req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.grade) { //Not enough data for either process
        res.status(400).json({});;
        return;
    }
    var userUUID = uuid();
    if (!req.body.password) { // No password -> creates account for just attendence purposes
        var stmt = db.prepare(`INSERT into people values(?, ?, ?, ?, ?, ?);`);
        stmt.run(userUUID, req.body.firstname, req.body.lastname, req.body.grade, "", ""); //Sets the last two (password, chapter) as empty.  
        res.status(200).json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "grade": req.body.grade,
            "uuid": userUUID
        })
    } else {

        var stmt = db.prepare(`INSERT into people values(?, ?, ?, ?, ?, ?);`);
        stmt.run(userUUID, req.body.firstname, req.body.lastname, req.body.grade, req.body.password, ""); //Includes password but not password.  Use has yet to join chapter
        res.status(200).json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "grade": req.body.grade,
            "uuid": userUUID
        })
    }
});
//Gets the information of the person associated with the uuid
router.get('/:uuid', function (req, res) {
    if (!req.params.uuid) {
        res.status(400).json({});;
        return;
    }
    let sql = `SELECT * FROM people WHERE uuid = "${req.params.uuid}"`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400);
            return;
        }
        res.status(200).json(rows);
    });

});
//Sets the person current chapter
router.post('/:uuid/chapter/:chapterid', function (req, res) {
    if (!req.params.uuid || !req.params.chapterid) {
        res.status(400);
        return;
    }
    stmt = db.prepare(`UPDATE people SET chapter = "${req.params.chapterid}" WHERE uuid = "${req.params.uuid}"`)
    stmt.run();
    res.status(200).json({});;
})
//returns the users current chapter
router.get('/:uuid/chapter', function (req, res) {

    var sql = `SELECT chapter FROM people WHERE uuid = "${req.params.uuid}"`;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({});;
            return;
        }
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(400).json({});;
        }
    })

})
module.exports = router;