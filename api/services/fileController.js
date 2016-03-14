var shortid = require('shortid');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require('fs');
var path = require('path');
var Vsix = require('../models/Vsix.js');
var jwt = require('jwt-simple');
var http = require('http');

var conn = mongoose.createConnection('mongodb://localhost/mXTGalleryWebApp');

conn.once('open', function() {
  console.log('open');
  gfs = Grid(conn.db, mongoose.mongo);
});

exports.upload = function(req, res) {

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

  console.log("Inside upload module");

  var file = req.files.file;

  var param = req.body.isVisibleToAll;
  var isVisibleToAll = false;
  if (param && param.toString() === 'true')
    isVisibleToAll = true;

  var options = {
    filename: file.originalFilename
  };
  console.log(file.originalFilename);
  gfs.exist(options, function(err, found) {
    if (err) return handleError(err);

    found ? console.log('A File With same name exists') : console.log('File does not exist');

    if (!found) {

      var writestream = gfs.createWriteStream({
        filename: file.originalFilename
      });

      fs.createReadStream(file.path).pipe(writestream);

      writestream.on('close', function(file) {
        var newVsix = new Vsix({
          email: userEmail,
          fileName: file.filename,
          _id: file._id,
          displayName: path.parse(file.filename).name,
          isVisibleToAll: isVisibleToAll
        });

        newVsix.save(function(err) {
          if (err) return next(err);
          console.log(newVsix + ' has been saved in DB');
        })

      });
    }
  });

};


exports.download = function(req, res) {

  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not autherized'
    });
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, "CoolDudes123..");

  if (!payload.sub)
    res.status(401).send('Authentication failed');

  var _id = req.query.id;
  var filename = req.query.filename;
  console.log(_id);
  console.log(filename);
  var options = {
    _id: _id
  };

  gfs.exist(options, function(err, file) {
    if (err) return handleError(err);
    file ? console.log('File exists') : console.log('File does not exist');
    if (file) {

      var readstream = gfs.createReadStream({
        _id: _id
      });

      res.set('Content-Type', 'application/octet-stream');
      res.set('Content-Disposition', 'attachment; filename="' + filename + '"');

      readstream.pipe(res);
    }

  });
}
