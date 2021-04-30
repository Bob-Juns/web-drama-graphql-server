const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { dramas } = require('../models/Dramas');
const { users } = require('../models/Users');

const resolvers = {
	Query: {
		// Drama Query
		allDramas: async () => await dramas.find(),
		getDramaById: async (_, { _id }) => await dramas.findById({ _id }),
		getDramaByUrl: async (_, { url }) => await dramas.findOne({ url }),
		getDramaByTitle: async (_, { title }) => await dramas.findOne({ title }),

		// User Query
		allUsers: async () => await users.find(),
		getUserByUserId: async (_, { userId }) => await users.findOne({ userId }),
		getUserByEmail: async (_, { email }) => await users.findOne({ email }),
	},

	Mutation: {
		// Drama Mutation
		addDrama: async (
			_,
			{
				title,
				url,
				summary,
				cover,
				youtube,
				image1,
				image2,
				image3,
				img1_title,
				img2_title,
				img3_title,
				video1,
				video2,
				video3,
			}
		) => {
			const newDrama = await new dramas({
				title,
				url,
				summary,
				cover,
				youtube,
				image1,
				image2,
				image3,
				img1_title,
				img2_title,
				img3_title,
				video1,
				video2,
				video3,
			});
			return newDrama.save();
		},
		removeDrama: async (_, { _id }) => await dramas.findOneAndDelete({ _id }),
		updateDrama: async (
			_,
			{
				_id,
				title,
				url,
				summary,
				cover,
				youtube,
				image1,
				image2,
				image3,
				img1_title,
				img2_title,
				img3_title,
				video1,
				video2,
				video3,
			}
		) => {
			return await dramas.findOneAndUpdate(
				{ _id },
				{
					title,
					url,
					summary,
					cover,
					youtube,
					image1,
					image2,
					image3,
					img1_title,
					img2_title,
					img3_title,
					video1,
					video2,
					video3,
				},
				{
					new: true,
				}
			);
		},

		//  User Mutation
		register: async (_, { userId, username, password, email, token }) => {
			const user = await users.findOne({ userId });
			if (user) {
				throw new Error('이미 존재하는 ID입니다.');
			}
			const passwordHash = await bcrypt.hash(password, 10);
			const newUser = await new users({
				userId,
				username,
				password: passwordHash,
				email,
				token,
			});
			newUser.save();
			return true;
		},

		login: async (_, { userId, password, _id }) => {
			const user = await users.findOne({ userId });
			if (!user) throw await new Error('ID를 확인해 주세요.');
			if (user.token !== '')
				throw await new Error('이미 로그인 되어 있습니다.');

			const validPassword = await bcrypt.compareSync(password, user.password);
			if (!validPassword) throw await new Error('잘못된 비밀번호 입니다.');

			const jwtPayload = { _id, userId };
			const jwtToken = sign(jwtPayload, 'secretTokenKey', { expiresIn: '10h' });
			return await users.findOneAndUpdate(
				{ userId },
				{ token: jwtToken },
				{ new: true }
			);
		},

		logout: async (_, { userId, token }) => {
			if (token !== '') {
				await users.findOneAndUpdate({ userId }, { token: '' }, { new: true });
				return true;
			}
			if (token === '') {
				throw await new Error('호이?');
			}
		},
	},
};

module.exports = resolvers;
