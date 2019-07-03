/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
// const _ = require('lodash');
const keystone = require('keystone');
const converter = require('../utils/converter');
const header = require('../templates/data/header.json');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	// trang chủ, giới thiệu, dịch vụ, tin tức, liên hệ
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	keystone.list('Category').model.find({}, (err, categories) => {
		if (err) throw err;
		res.locals.categories = [];

		const { lang } = req.cookies;
		let typeName = 'nameVie';

		if (lang) {
			typeName = (lang === 'english' ? 'nameEng' : 'nameVie');
			res.locals.header = ((lang === 'english' ? header.en : header.vi));
		}

		categories = categories
			.map((category) => Object.assign(category, { name: category[typeName] }))
			.sort((a, b) => {
				let num1 = 0;
				let num2 = 0;
				if (a.sortOrder) num1 = a.sortOrder;
				if (b.sortOrder) num2 = b.sortOrder;
				return num1 - num2;
			});

		const mapCategory = {};
		categories.forEach(category => {
			if (!category.isParent && category.parent) {
				if (!mapCategory[category.parent]) mapCategory[category.parent] = [];
				mapCategory[category.parent].push(category);
			}
		});
		categories.forEach(category => {
			if (category.isParent) {
				res.locals.categories.push({
					parent: category,
					children: mapCategory[category.id],
				});
			}
		});
		// console.log(res.locals.categories);
		res.locals.converter = converter;
		next();
	});
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
