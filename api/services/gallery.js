var jwt = require('jwt-simple');
var Vsix = require('../models/Vsix.js');

module.exports = function(req, res) {

  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not autherized'
    });
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, "CoolDudes123..");

  if (!payload.sub)
    res.status(401).send('Authentication failed');

  var userEmail = payload.email;

  if (userEmail.indexOf("@atmel.com") > -1) {
    console.log("Atmel user");
    Vsix.find(function(err, items) {
      if (err)
        res.send(err);
      res.json(items);
    });
  } else {
    console.log("Non Atmel user");
    Vsix.find({
      isVisibleToAll: true
    }, function(err, items) {
      if (err)
        res.send(err);
      res.json(items);
    });
  }


  //res.json(categories);
};

var categories = [
  'Tuning',
  'Diagnostic',
  'Linux',
  'Design',
  'Sensor'
];