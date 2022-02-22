const restful = require('node-restful');
const router = require('express').Router();

let PhoneTracker = restful.model('phonetracker');

PhoneTracker.methods(['post','delete']);
PhoneTracker.register(router, '/tracker');

router.get('/tracker', function(req, res) {
  let { phone, imei, email } = req.query;

  let query = PhoneTracker.find({});
  if (phone) {
    query.where({'number': {$regex: phone}});
  }
  if (imei) {
    query.where({'imei': imei});
  }
  if (email) {
    query.where({'email': {$regex: email}});
  }
  query.sort('-date_created');
  query.select('number imei email coords date_created')
  query.exec().then(function(result) {
    res.json(result);
  });
});

module.exports = router;