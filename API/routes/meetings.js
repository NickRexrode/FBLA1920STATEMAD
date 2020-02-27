var express = require('express');
var router = express.Router();
let db = require('../database/database.js').db;
var uuid = require('../database/database.js').uuid;
router.use(express.json());

//Returns meeting associated with the uuiud
router.get('/:uuid', function (req, res) {
    var sql = `SELECT * FROM "${req.params.uuid}"`;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({});;
            return;
        }
        res.status(200).json(rows);
    });
});
//Updates the persons attendence in the associated meeting
router.put('/:uuid', function (req, res) {
    var uuidPerson = req.body.uuidPerson;
    var attendance = req.body.attendance;
    var meetingUUID = req.params.uuid;
    if (!uuidPerson || !attendance || !meetingUUID) {
        res.status(400).json({});;
        return;
    }
    var stmt = db.prepare(`UPDATE "${meetingUUID}" SET attendance = "${attendance}" WHERE uuidPerson = "${uuidPerson}"`);
    stmt.run();
    res.status(200).json({});
})
//Creates a new meeting.  Copies every member from the assoicated member
router.post('/', function (req, res) {
    var chapterUUID = req.body.chapter;
    var name = req.body.name;
    if (!chapterUUID || !name) {
        res.status(400).json({});;
        return;
    }
    var newUUID = uuid();
    var newTableStmt = db.prepare(`CREATE TABLE IF NOT EXISTS "${newUUID}" ("uuidPerson" TEXT NOT NULL, "attendance" INTEGER NOT NULL)`);
    newTableStmt.run();
    var addToMeetingTable = db.prepare(`INSERT INTO meetings VALUES (?,?,?)`);
    addToMeetingTable.run(newUUID, name, chapterUUID);
    var sql = `SELECT * FROM "${chapterUUID}"`;
    db.all(sql, (err, rows) => {
        for (var i = 0; i < rows.length; i++) {
            var addSTMT = db.prepare(`INSERT INTO "${newUUID}" VALUES (?,?)`);
            addSTMT.run(rows[i].uuidPerson, 1); // Automatically sets everyone to present.  Only on original creation
        }
    });
    res.status(200).json({});;
});
//Deletes a meeting from the chapter
router.delete('/:uuid', function (req, res) {
    if (!req.params.uuid) {
        res.status(400).json({});;
        return;
    }
});



module.exports = router;