var jwt = require('jwt-simple');
var moment = require('moment');


module.exports = function(user, res) {
  var payload = {
    sub: user.id,
    email: user.email,
    exp: moment().add(10, 'days').unix()
  }
  var token = jwt.encode(payload, "CoolDudes123..");

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}
