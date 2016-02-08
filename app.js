
/**
 * CloudKibo Official APP
 * 
 */

// dependencies
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var userprofile = require('./routes/userprofile');
var meetingrecord = require('./routes/meetingrecord');
var webhook = require('./routes/webhook');

var app = express();

// all environments
app.set('port', process.env.PORT || 6688);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));
app.use(session({
  cookieName: 'session',
  secret: '1234567890QWERTY',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.use('/', routes);
app.use('/',userprofile);
app.use('/',meetingrecord);
app.use('/',webhook);


/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/


var server = http.createServer(app)



server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

