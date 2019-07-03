const keystone = require('keystone');
const Types = keystone.Field.Types;

const Page = new keystone.List('Page');

Page.add({
	title: { type: String, require: true, initial: true },
	category: { type: Types.Relationship, ref: 'Category', filters: { type: 'page' }, require: true, initial: true },
	htmlContentVie: { type: Types.Html, wysiwyg: true, height: 400 },
	htmlContentEng: { type: Types.Html, wysiwyg: true, height: 400 },
	createdAt: { type: Date, default: Date.now },
	createBy: { type: Types.Relationship, ref: 'Account' },
});

Page.defaultColumns = 'title, category, createdAt, createBy';
Page.register();
