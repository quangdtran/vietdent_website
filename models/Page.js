const keystone = require('keystone');
const Types = keystone.Field.Types;

const Page = new keystone.List('Page');

Page.add({
	title: { type: String, require: true, initial: true },
	htmlContent: { type: Types.Html, wysiwyg: true, height: 400 },
	category: { type: Types.Relationship, ref: 'Category' },
	message: { type: String },
	createdAt: { type: Date, default: Date.now },
	createBy: { type: Types.Relationship, ref: 'Account' },
});

Page.defaultColumns = 'category, message, createdAt, createBy';
Page.register();
