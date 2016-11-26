var db = require('./db');
var views = require('./fuckery'); // is this proper // do i give a damn // important questions

var port = process.env.PORT || 8888;

var bodyParser = require('body-parser');
var session = require('client-sessions');

var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  cookieName: 'session',
  secret: 'what the fuck',
  duration: 30*60*1000, //30 minz
  activeDuration: 5*60*1000 //5minz
}));

app.post('/login', function(req, res) {
  // query db
  var u = req.body.user;
  var p = req.body.pass; // i would hash this buttttttt it's midnight and i'm tired
  db.qq('SELECT * FROM userz WHERE username = $1 AND password = $2', [u, p], function(err, result) {
    if (err) {
      res.status(500).send("error:",err); // doesnt even redirect u
    } else if (result.rows.length < 1) {
      res.redirect('/fu4eva'); //whatev
    } else {
      req.session.user = result.rows[0].username; // what the hell else would i need
      res.redirect('/');
    }
  });
});

app.all('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

app.all('/fu4eva', function(req, res) {
  res.send(views.bad_login_view());
});

app.all('/', function(req, res) {
  if (req.session && req.session.user) {
    db.qq('SELECT * FROM userz WHERE username = $1', [req.session.user], function(err, result) {
      if (result.rows.length < 1) {
        req.session.reset();
        res.send(views.logged_out_view());
      } else {
        res.send(views.logged_in_view(req.session.user));
      }
    });
  } else {
    res.send(views.logged_out_view());
  }
});

app.use(function(req, res) {
  // do i care
  res.status(404).send("this is a jank af 404");
});

app.listen(port);
