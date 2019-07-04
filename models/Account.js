const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Y Model
 * ==========
 */
const Account = new keystone.List('Account');

Account.add({
	name: { label: 'Tên', type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { label: 'Mật khẩu', type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Có thể đăng nhập và chỉnh sửa tất cả nội dung', index: true },
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
