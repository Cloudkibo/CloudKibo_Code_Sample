
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
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var agents = require('./routes/agents');
var groups = require('./routes/groups');
var completedcalls = require('./routes/completedcalls');
var waitingcalls = require('./routes/waitingcalls');
var inprogresscalls = require('./routes/inprogresscalls');
var consolidatedcalls = require('./routes/consolidatedcalls');
var abandonedcalls = require('./routes/abandonedcalls');
var companyprofile = require('./routes/companyprofile');
var groupcallstats = require('./routes/groupcallstats');
var agentscallstats = require('./routes/agentscallstats');
var userprofile = require('./routes/userprofile');

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

app.use('/', routes);
app.use('/', agents);
app.use('/', groups);
app.use('/', completedcalls);
app.use('/', waitingcalls);
app.use('/',inprogresscalls);
app.use('/', consolidatedcalls);
app.use('/',abandonedcalls);
app.use('/',companyprofile);
app.use('/',groupcallstats);
app.use('/',agentscallstats);
app.use('/',userprofile);


/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/


var server = http.createServer(app)



server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

