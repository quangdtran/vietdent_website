const keystone = require('keystone');
const Types = keystone.Field.Types;
const email = require('../utils/emailSender');
const emailExistence = require('email-existence');

const Booking = new keystone.List('Booking', {
	nocreate: true,
	// noedit: true,
});

Booking.add({
	customerName: { label: 'Tên', type: String, noedit: true },
	bookingDate: { label: 'Ngày hẹn', type: Types.Date, format: 'DD-MM-YYYY', noedit: true },
	bookingTime: { label: 'Giờ hẹn', type: String, noedit: true },
	customerEmail: { label: 'Email', type: Types.Email, noedit: true },
	customerPhoneNumber: { label: 'Số điện thoại', type: Types.Number, noedit: true },
	customerMessage: { label: 'Tin nhắn', type: String, noedit: true },
	state: {
		label: 'Trạng thái', type: Types.Select, options: [
			{ label: 'Chưa xác nhận', value: 'pending' },
			{ label: 'Xác nhận đặt lịch', value: 'accept' },
			{ label: 'Từ chối đặt lịch', value: 'deny' },
		], default: 'pending',
	},
	reply: { label: 'Trả lời khách hàng', type: Types.Html, wysiwyg: true, height: 400 },
	createAt: { label: 'Tạo lúc', type: Date, default: Date.now, noedit: true },
});

// Booking.schema.pre('save', (next, t) => {
// 	// console.log(t);
// 	// throw new Error('Không thể gửi email');
// });

Booking.schema.post('validate', (booking, next) => {
	if (booking.state !== 'pending') {
		// check email existence
		emailExistence.check(booking.customerEmail, (err, result) => {
			if (err) {
				next(new Error('Lỗi xảy ra khi kiểm tra email'));
			} else {
				if (!result) {
					next(new Error('Email cung cấp không tồn tại'));
				} else {
					// send email confirm for customer
					email.confirmBooking(booking, (err, info) => {
						if (err) {
							next(new Error('Gửi email thất bại, kiểm tra tài khoản gửi email'));
						} else next();
					});
				}
			}

		});
	} else next();
});

Booking.defaultColumns = 'bookingDate, bookingTime, customerEmail, isAccepted, createAt';
Booking.register();
