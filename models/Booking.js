const keystone = require('keystone');
const Types = keystone.Field.Types;

const Booking = new keystone.List('Booking', {
	nocreate: true,
	noedit: true,
});

Booking.add({
	bookingTime: { type: Date },
	customerEmail: { type: Types.Email, required: true },
	isAccepted: { type: Boolean },
	message: { type: String },
	createAt: { type: Date, default: Date.now },
});

Booking.defaultColumns = 'bookingTime, customerEmail, isAccepted, createAt';
Booking.register();
