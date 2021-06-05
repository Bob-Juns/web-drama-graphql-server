const { dramas } = require('../models/Dramas');

const resolvers = {
	Query: {
		// Drama Query
		allDramas: async () => await dramas.find(),
		getDramaById: async (_, { _id }) => await dramas.findById({ _id }),
		getDramaByUrl: async (_, { url }) => await dramas.findOne({ url }),
		getDramaByTitle: async (_, { title }) => await dramas.findOne({ title }),
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
	},
};

module.exports = resolvers;
