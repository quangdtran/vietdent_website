/* eslint-disable indent */
const emailSender = require('../../utils/emailSender');

exports = module.exports = function (req, res) {

  // var view = new keystone.View(req, res);
  // var locals = res.locals;

  // console.log(req.body);
  emailSender.contactNotification(req, res, (err, info) => {
    if (err) {
      res.redirect(`/contact?popup=contact-fail`);
    } else {
      console.log(`Message ${info.messageId} sent: ${info.response}`);
      res.redirect(`/contact?popup=contact-success`);
    }
  });

};
