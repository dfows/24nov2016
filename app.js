var db = require('./db');
var views = require('./fuckery'); // is this proper // do i give a damn // important questions

var loggedIn = false; // lol. ...... LOL
var port = process.env.PORT || 8888;

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', function(req, res) {
  // query db
  var u = req.body.user;
  var p = req.body.pass; // i would hash this buttttttt it's midnight and i'm tired
  db.qq('SELECT * FROM userz WHERE username = $1 AND password = $2', [u, p], function(err, result) {
    if (err) {
      res.status(500).send("error:",err); // doesnt even redirect u
    } else if (result.rows < 1) {
      res.redirect('/fu4eva'); //whatev
    } else {
      loggedIn = true;
      res.redirect('/');
    }
  });
});

app.all('/logout', function(req, res) {
  loggedIn = false;
  res.redirect('/');
});

app.all('/fu4eva', function(req, res) {
  res.send(views.bad_login_view);
});

app.use('/', function(req, res) {
  if (loggedIn) {
    res.send(views.logged_in_view);
  } else {
    res.send(views.logged_out_view);
  }
});

app.listen(port);
