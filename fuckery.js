function viewThis(fuckery, u) {
  return function(u) {
    return '<html>' +
      '<head>' +
        '<meta http-equiv="Content-Type" content="text/html" charset=UTF-8 />' +
        '<title>i ate too much chocolate</title>' +
      '</head>' +
      '<body>' +
        '<div>' +
          fuckery(u) +
        '</div>' +
      '</body>' +
    '</html>';
  }
}

var logged_out = function() {
  return '<p>U are logged out</p>' +
  '<form action="/login" method="post">' +
    '<input type="text" name="user" />' +
    '<input type="text" name="pass" />' +
    '<input type="submit" value="log in" />' +
  '</form>';
}

var logged_in = function(username) {
  return '<p>Hi, ' +
    username +
  '</p>' +
  '<p>U are logged in</p>' +
  '<form action="/logout" method="post">' +
    '<input type="submit" value="log out" />' +
  '</form>';
}

var bad_login = function() {
  return '<p>bad login. either username or password was incorrect.</p>' +
  '<a href="/">try again</a>';
}

exports.logged_in_view = viewThis(logged_in);
exports.logged_out_view = viewThis(logged_out);
exports.bad_login_view = viewThis(bad_login);
