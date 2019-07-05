const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	const { lang } = req.cookies;

	// locals.section is used to set the currently selected
	// item in the heade	r navigation.
	locals.section = 'home';
	if (!lang || lang === 'vietnamese') {
		return view.render('home-vi');
	} else if (lang === 'english') {
		return view.render('home-en');
	}
	view.render('home-vi');

	// Render the view
};
