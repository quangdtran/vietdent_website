const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const { section, postId } = req.params;

	const view = new keystone.View(req, res);
	const locals = res.locals;
	const { lang } = req.cookies;

	// Set locals
	keystone.list('Post').model.findOne({ _id: postId }, (err, post) => {
		if (err) throw err;

		locals.section = section;
		let typeContent = 'contentVie';
		let typeTitle = 'titleVie';

		if (lang) {
			typeContent = (lang === 'english' ? 'contentEng' : 'contentVie');
			typeTitle = (lang === 'english' ? 'titleEng' : 'titleVie');
		}
		locals.post = Object.assign(post, { contentDisplay: post[typeContent], title: post[typeTitle] });

		// gey path
		keystone.list('Category').model
			.find({ _id: { $in: [section, post.category] } })
			.sort('-createdAt')
			.exec((err, categories) => {
				if (err) throw err;

				let typeName = 'nameVie';
				// let typeTitle = 'titleVie';
				if (lang) {
					// typeTitle = (lang === 'english' ? 'titleEng' : 'titleVie');
					typeName = (lang === 'english' ? 'nameEng' : 'nameVie');
				}

				locals.paths = categories.map((category) => category[typeName]);
				// locals.paths.push(post[typeTitle]);

				keystone.list('Post').model.find(
					{
						id: { $not: RegExp(post.id) },
						category: post.category,
					},
					null,
					{
						skip: 0, // Starting Row
						limit: 4, // Ending Row
						sort: {
							createAt: 1, //Sort by Date Added DESC
						},
					}
				)
					.exec((err, postRelations) => {
						if (err) throw err;
						if (postRelations) {
							locals.postRelations = postRelations.map(postRelation =>
								Object.assign(postRelation, { title: postRelation[typeTitle] }));
						}
						// Render the view
						view.render('post');
					});

			});

	});

};
