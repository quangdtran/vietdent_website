const keystone = require('keystone');
const Types = keystone.Field.Types;

const Page = new keystone.List('Page');

Page.add({
	title: { label: 'Tiêu đề', type: String, require: true, initial: true },
	category: { type: Types.Relationship, ref: 'Category', filters: { type: 'page' }, require: true, initial: true },
	htmlContentVie: { label: 'Nội dung tiếng việt', type: Types.Html, wysiwyg: true, height: 400 },
	htmlContentEng: { label: 'Nội dung tiếng anh', type: Types.Html, wysiwyg: true, height: 400 },
	createdAt: { label: 'Tạo lúc', type: Date, default: Date.now, noedit: true },
	createdBy: { label: 'Tạo bởi', type: Types.Relationship, ref: 'Account' },
});

Page.defaultColumns = 'title, category, createdAt, createBy';
Page.register();
