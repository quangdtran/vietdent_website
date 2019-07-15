var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'nameDisplay' },
	autokey: { path: 'slug', from: 'nameDisplay', unique: true },
});

Post.add({
	titleVie: { type: String, label: 'Tiêu đề tiếng việt', required: true, initial: true },
	titleEng: { type: String, label: 'Tiêu đề tiếng anh', default: 'no title' },
	image: { label: 'Hình ảnh', type: Types.CloudinaryImage },
	briefVie: { type: Types.Html, label: 'Tóm tắt tiếng việt', wysiwyg: true, height: 150 },
	briefEng: { type: Types.Html, label: 'Tóm tắt tiếng anh', wysiwyg: true, height: 150 },
	contentVie: { type: Types.Html, label: 'Nội dung tiếng việt', wysiwyg: true, height: 400 },
	contentEng: { type: Types.Html, label: 'Nội dung tiếng anh', wysiwyg: true, height: 400 },
	category: { type: Types.Relationship, ref: 'Category', filters: { type: 'post' } },
	createdAt: { label: 'Tạo lúc', type: Date, default: Date.now, noedit: true },
	createdBy: { label: 'Tạo bởi', type: Types.Relationship, ref: 'Account', noedit: true },
	nameDisplay: { type: String, hidden: true, watch: 'titleVie', initial: false, noedit: true, value: setNameDisplay },
});

function setNameDisplay () {
	return this.titleVie;
}

Post.schema.pre('save', function (next) {
	this.createdBy = this._req_user;
	next();
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'titleVie, titleEng, category, createAt';
Post.register();
