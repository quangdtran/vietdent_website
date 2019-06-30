var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	const { section } = req.query;

	// locals.section is used to set the currently selected
	// item in the heade	r navigation.
	locals.section = section;

	// Render the view
	view.render('post-list');
};
