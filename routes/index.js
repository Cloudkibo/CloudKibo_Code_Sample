var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var  headers =  {
             'kibo-app-id' : '5wdqvvi8jyvfhxrxmu73dxun9za8x5u6n59',
             'kibo-app-secret': 'jcmhec567tllydwhhy2z692l79j8bkxmaa98do1bjer16cdu5h79xvx',
             'kibo-client-id': 'cd89f71715f2014725163952'     
          }
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

/* Get agent information */
router.get('/agents', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/users/allagents',
          headers:headers
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log(info.agents.length)
            console.log(info.agents);
            res.render('agents',{mydata:info.agents});

          }
      else
        {
          data = null;
          res.render('agents',data);
        
        }
     }
 
    request(options, callback);

    });

/*************************** Get groups information *********************************/

router.get('/groups', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/departments',
          headers:headers
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log(info.length)
            console.log(info);
      
            res.render('groups',{mydata:info});

          }
      else
        {
          data = null;
          res.render('groups',data);
        
        }
     }
 
    request(options, callback);

    });
    

module.exports = router;
