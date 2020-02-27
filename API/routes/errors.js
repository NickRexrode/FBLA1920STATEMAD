var express = require('express');
var router = express.Router();
let db = require('../database/database.js').db;
var uuid = require('../database/database.js').uuid;
router.use(express.json());

router.post('/', function (req, res) {
    if (!req.body.error) {
        res.status(400).json({});;
        return;
    }
    var newuuid = uuid();
    var stmt = db.prepare(`INSERT INTO errors VALUES (?,?)`);
    stmt.run(newuuid, req.body.error);
    res.status(200).json({});;
});
router.get('/', function (req, res) {
    var sql = `SELECT * FROM errors`;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({});;
            return;
        }
        res.status(200).json(rows);
    })
})
module.exports = router;