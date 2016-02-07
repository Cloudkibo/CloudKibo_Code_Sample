var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');
var headers;
/* Post meeting record. */
router.get('/webhook', function(req, res, next) {
  console.log(req.session.kiboappid);
  console.log(req.session.kiboappsecret);
  console.log(req.session.kiboclientid);
  
    headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          }
   var options = {
          url: 'https://api.cloudkibo.com/api/meetingchat',
          headers:headers,
          rejectUnauthorized : false,
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
          res.send('could not fetch data.');
        
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

 /*     Get meeting record for specific meeting */
 router.post('/meetingrecord/specific_conference', function(req, res, next) {
   console.log(req.body.requestid);
   var options = {
          url: 'https://api.cloudkibo.com/api/meetingchat/specific_conference',
          headers:headers,
          rejectUnauthorized : false,
          form:{ 'companyid': headers['kibo-client-id'],'request_id':req.body.requestid}
    
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
          res.send('could not fetch data.');
        
        }
     }
 
    request.post(options, callback);

 });

 
/************* Schedule meeting *************/ 
router.get('/schedule_meeting', function(req, res, next) {
  var today = new Date();
   var uid = Math.random().toString(36).substring(7);
   var unique_id = 'h' + uid + '' + today.getFullYear() + '' + (today.getMonth()+1) + '' + today.getDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();
  console.log(unique_id.length);
  res.render("schedule_meeting",{request_id:unique_id});
});

router.post('/schedule_meeting/generate_url', function(req, res, next) {
   console.log(req.body.requestid);
   
   //url for agent
   var options = {
          url: 'https://api.cloudkibo.com/api/meetingchat/generate_url_agent',
          headers:headers,
          rejectUnauthorized : false,
          form:{ 'companyid': headers['kibo-client-id'],'request_id':req.body.requestid,'agentname':req.body.agentname,'agentemail':req.body.agentemail,'visitorname':req.body.visitorname,'visitoremail':req.body.visitoremail}
    
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var url_agent = JSON.parse(body);
            console.log(url_agent);
            //url for visitor
                        var options_visitor = {
                            url: 'https://api.cloudkibo.com/api/meetingchat/generate_url_visitor',
                            headers:headers,
                            rejectUnauthorized : false,
                            form:{ 'companyid': headers['kibo-client-id'],'request_id':req.body.requestid,'agentname':req.body.agentname,'agentemail':req.body.agentemail,'visitorname':req.body.visitorname,'visitoremail':req.body.visitoremail}
                      
                          };
                           function callback_visitor(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                      var url_visitor = JSON.parse(body);
                                      console.log(url_visitor);
                                      res.render('url_meeting',{agenturl:url_agent.url,visitorurl:url_visitor.url});
                                }
                           }
                           request.post(options_visitor, callback_visitor);

          }
      else
        {
          data = null;
          console.log(error);
          res.send('could not fetch data.');
        
        }
     }
 
    request.post(options, callback);

 });

module.exports = router;
