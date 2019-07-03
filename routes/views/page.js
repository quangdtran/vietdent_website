const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;
	const { categoryId, section } = req.query;
	keystone.list('Page').model.findOne({ category: categoryId }, (err, page) => {
		if (err) throw err;
		if (!page) throw new Error('Not found a page');
		const { lang } = req.cookies;
		let typeContent = 'htmlContentVie';

		if (lang) {
			typeContent = (lang === 'english' ? 'htmlContentEng' : 'htmlContentVie');
		}
		locals.section = section;
		locals.page = Object.assign(page, { htmlContent: page[typeContent] });
		console.log(locals.page.htmlContent);

		// gey path
		keystone.list('Category').model.find({ _id: { $in: [section, categoryId] } }, (err, categories) => {
			let typeName = 'nameVie';
			if (lang) {
				typeName = (lang === 'english' ? 'nameEng' : 'nameVie');
			}

			locals.paths = categories.map((category) => category[typeName]);

			// Render the view
			view.render('page');
		});
	});
};
