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
  res.render('conferencewebhook'); 
 });

module.exports = router;
