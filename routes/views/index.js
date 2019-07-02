var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	console.log(req.cookies);
	// res.cookie('lang', 'vietnamese');

	// locals.section is used to set the currently selected
	// item in the heade	r navigation.
	locals.section = 'home';

	// Render the view
	view.render('home');
};
