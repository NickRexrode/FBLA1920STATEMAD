let db = require('../database/database.js').db;
var uuid = require('../database/database.js').uuid;
var express = require('express');
var router = express.Router();
router.use(express.json());


router.post('/', function (req, res) {
    //CREATING NEW CHAPTER
    if (!req.body.school || !req.body.userUUID) {
        res.status(400).json({});;
        return;
    }
    var newUUID = uuid();
    var newTableSTMT = db.prepare(`CREATE TABLE IF NOT EXISTS "${newUUID}" ("uuidPerson" TEXT NOT NULL)`);
    newTableSTMT.run();
    var addSTMT = db.prepare(`INSERT INTO chapters VALUES (?,?)`);
    addSTMT.run(newUUID, req.body.school);

    var updatePerson = db.prepare(`UPDATE people SET chapter = "${newUUID}" WHERE uuid = "${req.body.userUUID}"`)
    updatePerson.run();
    res.status(200).json({
        "chapterUUID": newUUID
    });

});
router.get('/', function (err, res) {
    var sql = `SELECT * FROM chapters`;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({});;
            return;
        }
        res.status(200).json(rows);
    })

})
//Remove a person from a chapter
router.delete('/:chapterUUID/:userUUID', function (req, res) {
    if (!req.params.chapterUUID || !req.params.userUUID) {
        res.status(400).json({});;
        return;
    }
    var stmt = db.prepare(`DELETE FROM "${req.params.chapterUUID}" WHERE uuidPerson = "${req.params.userUUID}"`);
    stmt.run();
    res.status(200).json({})
})
//Returns the chapter imformation associated with the requested uuid
router.get('/:uuid', function (req, res) {
    if (!req.params.uuid) {
        res.status(400).json({});;
        return;
    }
    var sql = `SELECT * FROM chapters WHERE uuid = "${req.params.uuid}"`;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({});;
            return;
        }
        res.status(200).json(rows);
    });
});
//returns the people who are in the associated chapter
router.get('/:uuid/people', function (req, res) {
    if (!req.params.uuid) {
        res.status(400).json({});;
        return;
    }
    let sql = `SELECT * FROM "${req.params.uuid}"`;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({});;
            return;
        }
        res.status(200).json(rows);
    })
})
//Add new person to chapter
router.post('/:uuid/', function (req, res) {
    if (!req.params.uuid || !req.body.uuidPerson) {
        res.status(400);
        return;
    }
    var stmt = db.prepare(`INSERT into "${req.params.uuid}" VALUES ("${req.body.uuidPerson}")`);
    stmt.run();
    res.status(200).json({});
})
//Gets the meetings that are associated with the chapter
router.get('/:uuid/meetings', function (req, res) {
    if (!req.params.uuid) {
        res.status(400).json({});;
        return;
    }
    var sql = `SELECT * FROM meetings WHERE chapter = "${req.params.uuid}"`
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({});;
            return;
        }
        res.status(200).json(rows)
    })

})

module.exports = router;