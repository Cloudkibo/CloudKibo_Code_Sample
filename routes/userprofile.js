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
   res.render('userchat',{mydata:null});
 });
 router.post('/userchat', function(req, res, next) {
   var username = 'Zarmeen';
   var uid = "568ccd550ab4e5565c94f092";
   var options = {
          url: 'https://api.cloudkibo.com/api/userchat',
          headers:headers,
          form:{ 'user._id': uid,'user1':username,'user2':req.body.contactname }
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log('successfully fetched')
            console.log(info);  
            res.render('userchat',{mydata:info.msg,uname1:username,uname2:req.body.contactname,uid:uid});

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
 
 /********* downloadcsv ********/    
  router.post('/downloadcsv', function(req, res, next) {
    res.set('Content-Type', 'application/octet-stream');
       var options = {
          url: 'https://api.cloudkibo.com/api/userchat',
          headers:headers,
          form:{ 'user._id': req.body.uid,'user1':req.body.uname1,'user2':req.body.uname2 }
        };
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var info = data.msg;
           // console.log(info);
            var keys = [];
            
                  var key = 0;
                  var val = info[0];
                  for(j in val){
                      var sub_key = j;
                      var sub_val = val.j;
                      //console.log(sub_key);
                      keys.push(sub_key);
                    
                    }
                    console.log(keys);


           // var i =0;
              json2csv({ data: info, fields: keys }, function(err, csv) {
    if (err) {
        console.log(err);
    }

    res.set({
        'Content-Disposition': 'attachment; filename=userchat.csv',
        'Content-Type': 'text/csv'
    });
    res.send(csv);
});

          }
      else
        {
          data = null;
          console.log(error);
        
        //  res.render('agents',data);
        
        }
     }
 
    request(options, callback);

  });    

  

  
module.exports = router;
