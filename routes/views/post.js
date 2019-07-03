const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const { section, postId } = req.query;

	const view = new keystone.View(req, res);
	const locals = res.locals;
	const { lang } = req.cookies;

	// Set locals
	keystone.list('Post').model.findOne({ _id: postId }, (err, post) => {
		if (err) throw err;

		locals.section = section;
		locals.post = post;

		// gey path
		keystone.list('Category').model.find({ _id: { $in: [section, post.category] } }, (err, categories) => {
			let typeName = 'nameVie';
			let typeTitle = 'titleVie';
			if (lang) {
				typeName = (lang === 'english' ? 'nameEng' : 'nameVie');
				typeTitle = (lang === 'english' ? 'titleEng' : 'titleVie');
			}

			console.log(categories);

			locals.paths = categories.map((category) => category[typeName]);
			locals.paths.push(post[typeTitle]);

			// Render the view
			view.render('post');
		});

	});

};
