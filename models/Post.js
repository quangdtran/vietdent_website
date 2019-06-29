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
	titleVie: { type: String, required: true, initial: true },
	titleEng: { type: String, required: true, initial: true },
	author: { type: Types.Relationship, ref: 'Account', index: true },
	image: { type: Types.CloudinaryImage },
	briefVie: { type: Types.Html, wysiwyg: true, height: 150 },
	briefEng: { type: Types.Html, wysiwyg: true, height: 150 },
	contentVie: { type: Types.Html, wysiwyg: true, height: 400 },
	contentEng: { type: Types.Html, wysiwyg: true, height: 400 },
	category: { type: Types.Relationship, ref: 'Category', path: 'nameVie' },
	createdAt: { type: Date, default: Date.now },
	createBy: { type: Types.Relationship, ref: 'Account' },
	nameDisplay: { type: String, watch: 'titleVie, titleEng', initial: false, noedit: true, value: setNameDisplay },
});

function setNameDisplay () {
	return this.titleVie + ' - ' + this.titleEng;
}

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'titleVie, titleEng, category, createAt';
Post.register();
