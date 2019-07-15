const keystone = require('keystone');

exports = module.exports = function (req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;
	const { categoryId, section } = req.params;
	keystone.list('Page').model.findOne({ category: categoryId }, (err, page) => {
		if (err) throw err;
		const { lang } = req.cookies;
		let typeContent = 'htmlContentVie';
		locals.section = section;
		if (lang) {
			typeContent = (lang === 'english' ? 'htmlContentEng' : 'htmlContentVie');
		}

		if (!page) {
			locals.page = { htmlContent: null };
		} else {
			locals.page = Object.assign(page, { htmlContent: page[typeContent] });
		}


		// get path
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
