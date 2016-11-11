var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
// needs to be region of lambda function
AWS.config.update({region:'us-east-1'});

/* GET users listing. */
router.post('/phantom', function(req, res, next) {
  var inputUrl = req.body.url;
  if (!/^(?:f|ht)tps?\:\/\//.test(inputUrl)) {
        inputUrl = "http://" + inputUrl;
    }
  var inputUrlObj = { url: inputUrl };
  var params = {
    FunctionName: 'phantom-lambda-template-development',
    Payload: JSON.stringify(inputUrlObj)
  };
  var lambda = new AWS.Lambda();
  lambda.invoke(params, function(err, data) {
    res.send(JSON.parse(data.Payload));
  });
});

module.exports = router;
