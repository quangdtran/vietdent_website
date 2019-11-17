const keystone = require('keystone');


exports = module.exports = function (req, res) {
	let { total, serviceId } = req.query;

	if (total) total = parseInt(total);
	else total = 6;

	keystone.list('Post').model
		.find({ category: serviceId })
		.limit(total)
		.sort('-createdAt')
		.exec((err, posts) => {
			if (err) throw new Error('Error when select posts');
			res.json(posts);
		});
};
