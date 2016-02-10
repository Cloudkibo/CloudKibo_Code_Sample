var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');
var headers;
/* Get conferencewebhook. */
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
  url: 'https://api.cloudkibo.com/api/companyaccounts/',
  headers:headers,
  rejectUnauthorized : false,
  form:{ 'companyid': headers['kibo-client-id']}

          };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.length)
            console.log(info);  
            res.render('conferencewebhook',{mydata:info.company});

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

/* Update conferencewebhook. */
router.post('/webhook/updatewebhook', function(req, res, next) {
  console.log(req.session.kiboappid);
  console.log(req.session.kiboappsecret);
  console.log(req.session.kiboclientid);
  
    headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          }
   console.log(req.body.newwebhook);
   var options = {
  url: 'https://api.cloudkibo.com/api/companyaccounts/webhook',
  headers:headers,
  rejectUnauthorized : false,
  form:{'companyid':headers['kibo-client-id'],'webhook':req.body.newwebhook}

          };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);  
            res.render('conferencewebhook',{mydata:{'companyid':headers['kibo-client-id'],'companyname':req.body.companyname,'webhook':req.body.newwebhook}});

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
