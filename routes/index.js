const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.beforeRender);

// Import Route Controllers
const routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/home', routes.views.index);
	app.get('/page/:categoryId/:section/:category?', routes.views.page);
	app.get('/post-list/:categoryId/:section/:category?', routes.views.postList);
	app.get('/post/:postId/:section/:postTitle?', routes.views.post);
	app.all('/contact', routes.views.contact);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/detail', routes.views.detail);

	// API
	app.post('/submit-book-form', routes.api.bookForm);
	app.post('/submit-contact-form', routes.api.contactForm);
	app.post('/api/image', routes.api.imageUpload);
	app.get('/api/posts', routes.api.post);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
