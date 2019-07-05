/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
const nodeMailer = require('nodemailer');
const moment = require('moment');

const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
});

module.exports = {
  contactNotification(req, res, callback) {
    const {
      name,
      phone,
      email,
      message,
    } = req.body;

    const mailOptions = {
      from: `"Bệnh viện nha khoa vietdent" <${process.env.EMAIL_SENDER}>`,
      to: process.env.EMAIL_SENDER,
      subject: 'THÔNG TIN LIÊN HỆ TỪ NGƯỜI DÙNG',
      html: `
        <b>Thông tin liên hệ:</b>
        <p><b>Tên: </b> ${name} </p>
        <p><b>Số điện thoại: </b> ${phone} </p>
        <p><b>Email: </b> ${email} </p>
        <p><b>Tin nhắn: </b> ${message} </p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return callback(error);
      }
      callback(null, info);
    });
  },
  confirmBooking(booking, callback) {
    console.log('user:', process.env.EMAIL_SENDER);
    console.log('pass: ', process.env.EMAIL_SENDER_PASSWORD);
    let html, subject;

    if (booking.state === 'accept') {
      subject = 'BỆNH VIỆN VIETDENT THÔNG BÁO ĐẶT LỊCH KHÁM THÀNH CÔNG';
      html = `
        <b style="color: green;">Đặt lịch khám thành công</b>
        <p><b>Ngày: </b> ${moment(booking.bookingDate).format('DD/MM/YYYY')} </p>
        <p><b>Giờ: </b> ${booking.bookingTime} </p>
        <p><b>Tại phòng khám: </b> Vietdent </p>
        <p><b>Địa chỉ: </b> 222 Trần Phú, Phường 9, Quận 5, Hồ Chí Minh </p>
        <p><b>Ghi chú: </b> ${booking.reply ? booking.reply : 'Không có nội dung'} </p>
      `;
    } else if (booking.state === 'deny') {
      subject = 'BỆNH VIỆN VIETDENT THÔNG BÁO ĐẶT LỊCH KHÁM THẤT BẠI';
      html = `
        <b style="color: red;">Đặt lịch khám thất bại</b>
        <p><b>Ngày: </b> ${moment(booking.bookingDate).format('DD/MM/YYYY')} </p>
        <p><b>Giờ: </b> ${booking.bookingTime} </p>
        <p><b>Ghi chú: </b> ${booking.reply ? booking.reply : 'Không có nội dung'} </p>
      `;
    }
    const mailOptions = {
      from: `"Bệnh viện nha khoa vietdent" <${process.env.EMAIL_SENDER}>`,
      to: booking.customerEmail,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return callback(error);
      }
      callback(null, info);
    });
  },
};
