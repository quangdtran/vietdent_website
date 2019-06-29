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
	nameVie: { type: String, required: true, initial: true },
	nameEng: { type: String, required: true, initial: true },
	parent: { type: Types.Relationship, ref: 'Category' },
	type: { type: String },
	sortOrder: { type: Number },
	createdAt: { type: Date, default: Date.now },
	createBy: { type: Types.Relationship, ref: 'Account' },
	nameDisplay: { type: String, watch: 'nameVie, nameEng', initial: false, noedit: true, value: setNameDisplay },
});

function setNameDisplay () {
	return this.nameVie + ' - ' + this.nameEng;
}

Category.relationship({ ref: 'Post', path: 'posts', refPath: 'category' });

Category.defaultColumns = 'nameVie, nameEng, type, parent';

Category.register();
