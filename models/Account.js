const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Y Model
 * ==========
 */
const Account = new keystone.List('Account');

Account.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Account.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Account.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Account.defaultColumns = 'name, email, isAdmin';
Account.register();
