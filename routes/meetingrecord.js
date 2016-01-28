var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');
var  headers =  {
              'kibo-app-id': '5wdqvvi8jyvfhxrxmu73dxun9za8x5u6n59',
              'kibo-app-secret': 'jcmhec567tllydwhhy2z692l79j8bkxmaa98do1bjer16cdu5h79xvx',
              'kibo-client-id': 'cd89f71715f2014725163952',
              'content-type' : 'application/x-www-form-urlencoded'
              
          }
/* Post meeting record. */
router.get('/meetingrecord', function(req, res, next) {

   var options = {
          url: 'https://api.cloudkibo.com/api/meetingchat',
          headers:headers,
          form:{ 'companyid': headers['kibo-client-id']}
    
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.length)
            console.log(info);  
            res.render('meetingrecord',{mydata:info});

          }
      else
        {
          data = null;
          console.log(error);
          //res.render('groups',data);
        
        }
     }
 
    request.post(options, callback);

 });

 
// write meeting record in csv
  router.post('/meetingrecord/downloadcsv', function(req, res, next) {
    res.set('Content-Type', 'application/octet-stream');
    var info = JSON.parse(req.body.dd);//data.msg;
    console.log(info);
    var keys = [];
    var key = 0;
    
    var val = info[0];
    for(j in val){
          var sub_key = j;
          var sub_val = val.j;
          keys.push(sub_key);
          }
         console.log(keys);
     json2csv({ data: info, fields: keys }, function(err, csv) {
        if (err) {
            console.log(err);
        }

      res.set({
          'Content-Disposition': 'attachment; filename=meetingrecord.csv',
          'Content-Type': 'text/csv'
      });
    res.send(csv);
    });

  });  
module.exports = router;
