const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;
	const { categoryId, section } = req.query;
	keystone.list('Page').model.findOne({ category: categoryId }, (err, page) => {
		if (err) throw err;
		locals.section = section;
		locals.page = page;
		view.render('page');
	});
  // locals.section is used to set the currently selected
  // item in the heade	r navigation.

  // Render the view
};
