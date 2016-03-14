var fs = require('fs');
var path = require('path');
var Datauri = require('datauri');

module.exports = function(req, res) {
  var imageFolder = path.join(__dirname, '../', 'images');
  var fileName = req.query.filename;
  var images = [];
  if (!fileName) {
    console.log("Initial call.. Returning files list..");
    fs.readdir(imageFolder, function(err, files) {
      res.json(files);
      return;
    });
  } else {
    console.log("Trying to send image binary data..");
    fs.readdir(imageFolder, function(err, files) {
      if (!err) {
        var filesCount = 0;
        files.forEach(function(file) {
          if (file === fileName) {
            var filePath = path.join(imageFolder, file);
            var dUri = new Datauri(filePath);
            var imageNumber = 'carousel-selector-'.concat(filesCount.toString());
            //var data = fs.readFileSync(filePath).toString('base64');
            images.push({
              source: dUri.content,
              number: imageNumber
            });
            console.log(fileName + " sent to client..");
            res.json(images);
          }
          filesCount++;
        });
        //res.json(images);
      } else
        console.log("Error is " + err);
    });
  }
};
