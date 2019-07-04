/**
 * This file defines the email tests for your project.
 *
 * Each email test should provide the locals used to render the
 * email template for preview.
 *
 * Values can either be an object (for simple tests), or a
 * function that calls a callback(err, locals).
 *
 * Sample generated emails, based on the keys and methods below,
 * can be previewed at /keystone/test-email/{key}
 */

// const keystone = require('keystone');

module.exports = {

	/** New Enquiry Notifications */
	'contact-notification': function (req, res, callback) {
		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.

		const Email = require('keystone-email');
		new Email('contact-notification.ejs', {
			transport: 'mailgun',
		}).send(
			{

			},
			{
				apiKey: '',
				domain: '',
				to: '',
				from: {
					name: 'vietdent.com',
					email: 'vietdent@gmail..com',
				},
				subject: 'Your first KeystoneJS email',
			},
			callback);
	},

};
