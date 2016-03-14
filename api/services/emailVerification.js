var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var config = require('./config.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var User = require('../models/User.js');

var model = {
  verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
  title: 'mXT Gallery',
  subTitle: 'Thanks for signing up!',
  body: 'Please verify your email address by clicking the button below'
}

exports.send = function(email) {
    console.log("Email : " + email);
  var payload = {
    sub: email

  }
  var token = jwt.encode(payload, config.EMAIL_SECRET);

  /**var transporter = nodemailer.createTransport(smtpTransport({
    host: 'eusmtp01.corp.atmel.com',
    port: 25,
    secure: true,
    auth: {
      user: 'alex@socialplay.com',
      pass: config.SMTP_PASS
    }
  }));**/

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "mXTGallery@gmail.com",
      pass: "7thSense"
    }
  });

  var mailOptions = {
    from: 'mXTGallery@gmail.com',
    to: email,
    subject: 'mXT Gallery Account Verification',
    html: getHtml(token)
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) return;

    console.log('email sent ', info.response);
  })

}

exports.handler = function(req, res) {
  var token = req.query.token;

  var payload = jwt.decode(token, config.EMAIL_SECRET);

  var email = payload.sub;

  if (!email) return handleError(res);

  User.findOne({
    email: email
  }, function(err, foundUser) {
    if (err) return res.status(500);

    if (!foundUser) return handleError(res);

    if (!foundUser.active)
      foundUser.active = true;

    foundUser.save(function(err) {
      if (err) return res.status(500);

      return res.redirect(config.APP_URL);
    })
  })
}

function getHtml(token) {
  var path = './views/emailVerification.html';
  var html = fs.readFileSync(path, encoding = 'utf8');

  var template = _.template(html);

  model.verifyUrl += token;

  return template(model);
}

function handleError(res) {
  return res.status(401).send({
    message: 'Authentication failed, unable to verify email'
  });
}

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
