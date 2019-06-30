const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	const { section, categoryId, page } = req.query;

	keystone.list('Post').model.find({ category: categoryId }, (err, posts) => {
		if (err) throw err;

		const numberOfPostOnPage = 2;
		const numberOfPages = Math.round(posts.length / numberOfPostOnPage);
		let pageNumber = parseInt(page) || 1;

		locals.numberOfPages = numberOfPages;
		locals.section = section;
		locals.posts = posts.filter((post, index) =>
			(numberOfPostOnPage * (pageNumber - 1)) <= index && index < (numberOfPostOnPage * pageNumber));

		locals.page = pageNumber;
		locals.section = section;
		locals.categoryId = categoryId;

		// Render the view
		view.render('post-list');
	});

	// locals.section is used to set the currently selected
	// item in the heade	r navigation.

};
