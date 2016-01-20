var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
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
          console.log(error);
        
        //  res.render('agents',data);
        
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
          console.log(error);
          //res.render('groups',data);
        
        }
     }
 
    request(options, callback);

    });
    
  /************************************* Get Completed calls info ***************************/
  /* Get agent information */
router.get('/completedcalls', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/completedcalls',
          headers:headers
        };
  
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = [];
            var dpt;
            var i =0;
            console.log(info.length)
          //  console.log(info);
       
    /*   
            for(var i = 0;i<info.length;i++)
            {
                    /***** to get department name ***/
              /*    var options1 = {
                      url: 'https://api.kibosupport.com/api/departments/'+info[i].departmentid,
                      headers:headers
                  };
                  function callback_deptname(error, response, body) {
                    if (!error && response.statusCode == 200) {
                      dpt = JSON.parse(body);
                      data.push(dpt.deptname);
                      
                    }
                    else
                      {

                        data.push('Not found');
                        console.log(error);
                     
                      }
                      console.log(data)             
                  }
                  
                 
                request(options1, callback_deptname);
                
              
            }
            */
             
                  //  res.render('completedcalls',{mydata:info,data:data});
      res.render('completedcalls',{mydata:info, duration: function(picktime,endtime) {
                                                                                            var then = moment(endtime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var now =  moment(picktime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var diff = moment.duration(then.diff(now));
                                                                                            if (diff < 0) {
                                                                                                diff = Math.abs(diff);
                                                                                            }
                                                                                            var d = moment.utc(diff).format("HH:mm:ss:SSS");
                                                                                            console.log("Difference: " + d);
                                                                                            return d;
                                                                                } 
                                }
                      );
          }
          
      else
        {
        //  data = null;
          console.log(error);
        
        
        }
     }
 
    request(options, callback);

    });

    
    /************************************* Get waiting calls information ****************/
    
  /* Get agent information */
router.get('/waitingcalls', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/waitingcalls',
          headers:headers
        };
  
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = [];
            var dpt;
            var i =0;
            console.log(info.length)
      res.render('waitingcall',{mydata:info, waittime: function(requesttime) {
                                                                                            var then = moment(requesttime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var now = moment();
                                                                                            var diff = moment.duration(then.diff(now));
                                                                                            if (diff < 0) {
                                                                                                diff = Math.abs(diff);
                                                                                            }
                                                                                            var d = moment.utc(diff).format("HH:mm:ss:SSS");
                                                                                            console.log("Difference: " + d);
                                                                                            return d;
                                                                                } 
                                }
                      );
               }
          
      else
        {
        //  data = null;
          console.log(error);
        
        
        }
     }
 
    request(options, callback);

    });
    
  /**************************** Get inprogress calls ***********/
    
  
router.get('/progresscalls', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/progresscalls',
          headers:headers
        };
  
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = [];
            var dpt;
            var i =0;
            console.log(info.length)
            res.render('inprogresscall',{mydata:info, datenow: function(picktime) {
                                                                                      var then = moment(picktime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                      var now = moment();
                                                                                      var diff = moment.duration(then.diff(now));
                                                                                      if (diff < 0) {
                                                                                          diff = Math.abs(diff);
                                                                                      }
                                                                                      var d = moment.utc(diff).format("HH:mm:ss:SSS");
                                                                                      console.log("Difference: " + d);
                                                                                      return d;
                                                                                    } 
                                        }
                      );
          }
          
      else
        {
        //  data = null;
          console.log(error);
        
        
        }
     }
 
    request(options, callback);

    });  

 /**************************** Get Consolidated calls ***********/
    
  
router.get('/consolidatedcalls', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/consolidatedcalls',
          headers:headers
        };
  
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = [];
            var dpt;
            var i =0;
            console.log(info.length)
            res.render('consolidatedcalls',{mydata:info, elapsedtime: function(requesttime,picktime,status) {
                                                                                      if(status == 'waiting')
                                                                                      {
                                                                                            var then = moment(requesttime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var now = moment();
                                                                                            var diff = moment.duration(then.diff(now));
                                                                                            if (diff < 0) {
                                                                                                diff = Math.abs(diff);
                                                                                            }
                                                                                            var d = moment.utc(diff).format("HH:mm:ss:SSS");
                                                                                            console.log("Difference: " + d);
                                                                                            return d;
                                                                                         
                                                                                        
                                                                                      }
                                                                                      else
                                                                                      {
                                                                                            var then = moment(picktime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var now = moment();
                                                                                            var diff = moment.duration(then.diff(now));
                                                                                            if (diff < 0) {
                                                                                                diff = Math.abs(diff);
                                                                                            }
                                                                                            var d = moment.utc(diff).format("HH:mm:ss:SSS");
                                                                                            console.log("Difference: " + d);
                                                                                            return d;
                                                                                      }
                                                                                    } 
                                        }
                      );
          }
          
      else
        {
        //  data = null;
          console.log(error);
        
        
        }
     }
 
    request(options, callback);

    });  
    /************************************* Get abandoned calls information ****************/
    
  /* Get agent information */
router.get('/abandonedcalls', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/abandonedcalls',
          headers:headers
        };
  
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = [];
            var dpt;
            var i =0;
            console.log(info.length)
      res.render('abandonedcalls',{mydata:info});
               }
          
      else
        {
        //  data = null;
          console.log(error);
        
        
        }
     }
 
    request(options, callback);

    });
    
    /************************************* Get Company information ****************/
    
  /* Get agent information */
router.get('/companyprofile', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/companyprofiles/fetch',
          headers:headers
        };
  
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = [];
            var dpt;
            var i =0;
            console.log(info.length);
            console.log(info);
      res.render('companyprofile',{mydata:info});
               }
          
      else
        {
        //  data = null;
          console.log(error);
        
        
        }
     }
 
    request(options, callback);

    });  
module.exports = router;
