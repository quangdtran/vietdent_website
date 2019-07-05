var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	const { lang } = req.cookies;

	// locals.section is used to set the currently selected
	// item in the heade	r navigation.
	locals.section = 'contact';
	if (!lang || lang === 'vietnamese') {
		return view.render('contact-vi');
	} else if (lang === 'english') {
		return view.render('contact-en');
	}
	view.render('contact-vi');
};
