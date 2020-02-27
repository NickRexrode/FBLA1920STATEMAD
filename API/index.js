//Allocating all files
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());
var chapter = require('./routes/chapter.js');
var people = require('./routes/people.js');
var meetings = require('./routes/meetings.js');
var logins = require('./routes/logins.js');
var errors = require('./routes/errors.js');

//Assigns all the endpoints
app.use('/chapters', chapter);
app.use('/people', people);
app.use('/meetings', meetings);
app.use('/logins', logins);
app.use('/errors', errors);

//Opens app on port 3000
app.listen(3000);