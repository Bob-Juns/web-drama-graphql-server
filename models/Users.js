const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true, unique: true },
		username: String,
		email: { type: String, unique: true, trim: true },
		password: { type: String, minlength: 4 },
		token: { type: String, default: '' },
		role: { type: Number, default: 0 },
	},
	{ collection: 'users' }
);

const users = mongoose.model('users', userSchema);

module.exports = { users };
