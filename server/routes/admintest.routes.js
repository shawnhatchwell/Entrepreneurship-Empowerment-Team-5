/* Dependencies */
var events = require('../controllers/events.server.controller.js'),
  express = require('express'),
  router = express.Router(),
  nodemailer = require('nodemailer'),
  Listing = require('../models/listings.server.model.js');

router.post('/send', function(req, res, next) {
  Listing.find({}, function(error, listings) {
    for (let listing of listings) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'entrepreneurshipempower@gmail.com',
          pass: 'CEN3031!'
        }
      });

      var mailOptions = {
        from: 'entrepreneurshipempower@gmail.com',
        to: listing.emailaddress,
        subject: req.body.emailsubject,
        text: req.body.emailbody
      };

      transporter.sendMail(mailOptions, function(error, info) {
        console.log(mailOptions.subject);
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  });
});

module.exports = router;
