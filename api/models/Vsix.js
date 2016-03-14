var mongoose = require('mongoose');

var VsixSchema = new mongoose.Schema({
  fileName: String,
  uploadedBy: String,
  displayName: String,
  _id: String,
  isVisibleToAll: Boolean
});

VsixSchema.methods.toJSON = function() {
  var item = this.toObject();
  console.log(item);
  return item;
};

VsixSchema.pre('save', function(next) {
  var item = this;
  // if (item.email.indexOf("@atmel.com") > -1)
  //    item.isVisibleToAll = true;
  // else
  //   item.isVisibleToAll = false;
  next();
})

module.exports = mongoose.model('Vsix', VsixSchema);
