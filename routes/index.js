var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');
var  headers =  {
             'kibo-app-id' : '5wdqvvi8jyvfhxrxmu73dxun9za8x5u6n59',
             'kibo-app-secret': 'jcmhec567tllydwhhy2z692l79j8bkxmaa98do1bjer16cdu5h79xvx',
             'kibo-client-id': 'cd89f71715f2014725163952'     
          }
/* GET home page. */

router.get('/', function(req, res, next) {
      res.render('index');

 });

router.post('/', function(req, res, next) {
      req.session.kiboappid = req.body.kiboappid;
      req.session.kiboappsecret = req.body.kiboappsecret;
      req.session.kiboclientid = req.body.kiboclientid;
     
      res.render('index',{myinfo :"Session saved."});

 });

module.exports = router;
