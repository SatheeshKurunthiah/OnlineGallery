var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var createSendToken = require('./services/jwt.js');
var facebookAuth = require('./services/facebookAuth.js');
var googleAuth = require('./services/googleAuth.js');
var LocalStrategy = require('./services/localStrategy.js');
var Gallery = require('./services/gallery.js');
var Images = require('./services/images.js');
var emailVerification = require('./services/emailVerification.js');
var FileController = require('./services/fileController.js');
var multiparty = require('connect-multiparty');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
var multipartyMiddleware = multiparty();


passport.serializeUser(function(user, done) {
    done(null, user.id);
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});



passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post('/register', passport.authenticate('local-register'), function(req, res) {
    console.log(req.user.email);
    emailVerification.send(req.user.email);
    createSendToken(req.user, res);
})

app.post('/upload', multipartyMiddleware, FileController.upload);

app.get('/download', FileController.download);

app.get('/gallery', Gallery);

app.get('/image', Images);

app.get('/auth/verifyEmail', emailVerification.handler);

app.post('/login', passport.authenticate('local-login'), function(req, res) {
    createSendToken(req.user, res);
})

app.post('/auth/google', googleAuth);

app.post('/auth/facebook', facebookAuth);

mongoose.connect('mongodb://localhost/mXTGalleryWebApp');

var server = app.listen(3000, function() {
    console.log("Listening on port :", server.address().port);
})