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
			{ label: 'post', value: 'post' },
			{ label: 'page', value: 'page' },
			{ label: 'title', value: 'title' },
		], required: true, initial: true },
	sortOrder: { type: Number, label: 'Thứ tự hiển thị' },
	createdAt: { type: Date, label: 'Tạo vào lúc', default: Date.now },
	createBy: { type: Types.Relationship, label: 'Tạo bởi tài khoản', ref: 'Account' },
	nameDisplay: { type: String, hidden: true, watch: 'nameVie', initial: false, noedit: true, value: setNameDisplay },
});

function setNameDisplay () {
	return this.nameVie;
}

Category.relationship({ ref: 'Post', path: 'posts', refPath: 'category' });

Category.defaultColumns = 'nameVie, nameEng, type, sortOrder, isParent, parent';

Category.register();
