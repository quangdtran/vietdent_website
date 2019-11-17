const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	const { lang } = req.cookies;

	let typeName = 'nameVie';
	// let typeTitle = 'titleVie';
	if (lang) {
		// typeTitle = (lang === 'english' ? 'titleEng' : 'titleVie');
		typeName = (lang === 'english' ? 'nameEng' : 'nameVie');
	}

	// locals.section is used to set the currently selected
	// item in the heade	r navigation.

	const limitDoc = 4;

	function getRandom (min, max) {
		return Math.ceil(Math.random() * (max - min) + min);
	}


	locals.section = 'home';
	keystone.list('Category').model.count({ parent: '5d23370dd622710023f29102' }, (err, count) => {
		if (err) throw new Error('Get error when select category model');
		const skipDoc = getRandom(1, count - limitDoc);
		keystone.list('Category').model
			.find({ parent: '5d23370dd622710023f29102' })
			.skip(skipDoc)
			.limit(limitDoc)
			.sort({ createdAt: 1 })
			.exec((err, services) => {
				if (err) throw new Error('Get error when select category model');
				locals.services = services.map(service => {
					service.nameDisplay = service[typeName];
					return service;
				});
				if (!lang || lang === 'vietnamese') {
					return view.render('home-vi');
				} else if (lang === 'english') {
					return view.render('home-en');
				}
				view.render('home-vi');
			});
	});

	// Render the view
};
