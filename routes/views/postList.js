const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	const { section, categoryId, page } = req.query;

	const { lang } = req.cookies;

	keystone.list('Post').model.find({ category: categoryId }, (err, posts) => {
		if (err) throw err;

		let typeTitle = 'titleVie';
		let typeBrief = 'briefVie';
		let typeContent = 'contentVie';

		if (lang) {
			typeTitle = (lang === 'english' ? 'titleEng' : 'titleVie');
			typeBrief = (lang === 'english' ? 'briefEng' : 'briefVie');
			typeContent = (lang === 'english' ? 'contentEng' : 'contentVie');
		}

		const numberOfPostOnPage = 2;
		const numberOfPages = Math.round(posts.length / numberOfPostOnPage);
		let pageNumber = parseInt(page) || 1;

		locals.numberOfPages = numberOfPages;
		locals.section = section;
		locals.posts = posts
			.map((post) => Object.assign(post, {
				title: post[typeTitle],
				brief: post[typeBrief],
				content: post[typeContent],
			}))
			.filter((post, index) =>
				(numberOfPostOnPage * (pageNumber - 1)) <= index && index < (numberOfPostOnPage * pageNumber));

		locals.page = pageNumber;
		locals.section = section;
		locals.categoryId = categoryId;

		keystone.list('Category').model.find({ _id: { $in: [section, categoryId] } }, (err, categories) => {
			let typeName = 'nameVie';
			if (lang) {
				typeName = (lang === 'english' ? 'nameEng' : 'nameVie');
			}

			locals.paths = categories.map((category) => category[typeName]);

			// Render the view
			view.render('post-list');
		});

	});

};
