var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get agent information */
router.get('/agents', function(req, res, next) {
	data = {name :'Adam',company : 'abc company'};
  res.render('agents',data);
});

module.exports = router;
