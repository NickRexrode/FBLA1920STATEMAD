let db = require('../database/database.js').db;
var uuid = require('../database/database.js').uuid;
var express = require('express');
var router = express.Router();
router.use(express.json());
//Login endpoint.  Recieves the login and determines if it is valid (200)
router.post('/', function (req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.password) {
        res.status(400).json({});
        
        return;
    }
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;

    var sql = `SELECT * FROM people WHERE firstname = "${firstname}" AND lastname = "${lastname}" AND password = "${password}"`;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({});
            return;
        }
        if (rows.length > 0) {
            res.status(200).json(rows);

        } else {
            res.status(400).json({});
        }
    })
})

module.exports = router;