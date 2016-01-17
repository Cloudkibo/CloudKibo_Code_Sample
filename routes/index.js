var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
 /* var headers = {
     'kibo-app-id' : '5wdqvvi8jyvfhxrxmu73dxun9za8x5u6n59',
     'kibo-app-secret': 'jcmhec567tllydwhhy2z692l79j8bkxmaa98do1bjer16cdu5h79xvx',
     'kibo-client-id': 'cd89f71715f2014725163952'     
  };
  var options = {
    headers: headers,
    json:true
 
  };
 needle.get('https://api.kibosupport.com/users/allagents',options, function(error, response,body) {
  if (!error && response.statusCode == 200)
  {
    var data  = JSON.parse(body);
    console.log(data.agents);
  }
   else{
      console.log('error');
    }
    });
    
   */

   var options = {
  url: 'https://api.kibosupport.com/users/allagents',
  headers: {
     'kibo-app-id' : '5wdqvvi8jyvfhxrxmu73dxun9za8x5u6n59',
     'kibo-app-secret': 'jcmhec567tllydwhhy2z692l79j8bkxmaa98do1bjer16cdu5h79xvx',
     'kibo-client-id': 'cd89f71715f2014725163952'     
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.agents);
    console.log(info);
  }
}
 
request(options, callback);

  res.render('index', { title: 'Express' });
});

/* Get agent information */
router.get('/agents', function(req, res, next) {
	data = {name :'Adam',company : 'abc company'};
  res.render('agents',data);
});

module.exports = router;
