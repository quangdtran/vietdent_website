const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const { section, postId } = req.query;

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// Set locals
	keystone.list('Post').model.findOne({ _id: postId }, (err, post) => {
		if (err) throw err;

		locals.section = section;
		locals.post = post;

		// Render the view
		view.render('post');
	});

};
