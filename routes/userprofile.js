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
              'kibo-client-id': 'Zarmeen',
                'content-type' : 'application/x-www-form-urlencoded'
              
          }
/* GET userprofile. */
router.get('/userprofile', function(req, res, next) {

   var options = {
          url: 'https://api.cloudkibo.com/api/users/me',
          headers:headers
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log(info.length)
            console.log(info);  
            res.render('userProfile',{mydata:info});

          }
      else
        {
          data = null;
          console.log(error);
          //res.render('groups',data);
        
        }
     }
 
    request(options, callback);

 });

 
 // get contact list
 router.get('/contactlist', function(req, res, next) {

   var options = {
          url: 'https://api.cloudkibo.com/api/contactslist',
          headers:headers
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log(info.length)
            console.log(info);  
            res.render('contactlist',{mydata:info});

          }
      else
        {
          data = null;
          console.log(error);
          //res.render('groups',data);
        
        }
     }
 
    request(options, callback);

 });
 
 //user chat
 
 // get contact list
 router.get('/userchat', function(req, res, next) {

   var options = {
          url: 'https://api.cloudkibo.com/api/userchat',
          headers:headers,
          form:{ 'user._id': "568ccd550ab4e5565c94f092",'user1':'Zarmeen','user2':'zarmeen92' }
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log('successfully fetched')
            console.log(info);  
            res.render('userchat',{mydata:info});

          }
      else
        {
          data = null;
          console.log(response.statusCode);
          //res.render('groups',data);
        
        }
     }
 
    request.post(options, callback);

 });
 
  

  
module.exports = router;
