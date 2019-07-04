/* eslint-disable indent */
const keystone = require('keystone');
const Booking = keystone.list('Booking');
const moment = require('moment');
const url = require('url');
const querystring = require('querystring');

exports = module.exports = function (req, res) {

  // var view = new keystone.View(req, res);
  // var locals = res.locals;

  console.log(req.body);
  const {
    name,
    phoneNumber,
    email,
    time,
    message,
  } = req.body;

  const date = moment(req.body.date).format('DD/MM/YY');
  let { currentUrl } = req.body;

  console.log(req.body);

  const pathName = currentUrl.split('?')[0];
  const query = currentUrl.split('?')[1] ? querystring.parse(currentUrl.split('?')[1]) : {};

  const booking = new Booking.model();
  booking.customerName = name;
  booking.customerPhoneNumber = phoneNumber;
  booking.bookingDate = date;
  booking.bookingTime = time;
  booking.customerEmail = email;
  booking.customerMessage = message;
  booking.save()
    .then(result => {
      res.redirect(url.format({
        pathname: pathName,
        query: Object.assign(query, { popup: 'book-success' }),
      }));
    })
    .catch(err => {
      res.redirect(url.format({
        pathname: pathName,
        query: Object.assign(query, { popup: 'book-fail' }),
      }));
    });

};
