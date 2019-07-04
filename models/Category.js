var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var Category = new keystone.List('Category', {
	map: { name: 'nameDisplay' },
});

Category.add({
	nameVie: { type: String, label: 'Tên tiếng việt', required: true, initial: true },
	nameEng: { type: String, label: 'Tên tiếng anh', default: 'no name' },
	isParent: { type: Boolean, label: 'Đặt trên thanh menu', require: true, initial: true },
	parent: {
		type: Types.Relationship,
		ref: 'Category',
		label: 'Đặt trong menu',
		filters: { isParent: true },
	},
	type: {
		label: 'Loại',
		type: Types.Select, options: [
			{ label: 'Post', value: 'post' },
			{ label: 'Page', value: 'page' },
			{ label: 'Title', value: 'title' },
		], required: true, initial: true },
	sortOrder: { type: Number, label: 'Thứ tự hiển thị' },
	createdAt: { type: Date, label: 'Tạo lúc', default: Date.now, noedit: true },
	createBy: { type: Types.Relationship, label: 'Tạo bởi', ref: 'Account' },
	nameDisplay: { type: String, hidden: true, watch: 'nameVie', initial: false, noedit: true, value: setNameDisplay },
});

function setNameDisplay () {
	return this.nameVie;
}

Category.relationship({ ref: 'Post', path: 'posts', refPath: 'category' });

Category.defaultColumns = 'nameVie, nameEng, type, sortOrder, isParent, parent';

Category.register();
