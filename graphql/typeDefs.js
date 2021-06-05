const { gql } = require('apollo-server-express');

const typeDefs = gql`
	# drama type
	type Dramas {
		_id: ID!
		title: String!
		url: String!
		summary: String!
		cover: String!
		youtube: String
		image1: String
		image2: String
		image3: String
		img1_title: String
		img2_title: String
		img3_title: String
		video1: String
		video2: String
		video3: String
	}

	input DramaInput {
		title: String
		url: String
		summary: String
		cover: String
		youtube: String
		image1: String
		image2: String
		image3: String
		img1_title: String
		img2_title: String
		img3_title: String
		video1: String
		video2: String
		video3: String
	}

	# user type
	type User {
		_id: ID!
		userId: String!
		username: String
		email: String
		password: String
		role: Int
		token: String
	}

	type Query {
		# drama query
		allDramas: [Dramas]!
		getDramaById(_id: ID!): Dramas
		getDramaByUrl(url: String!): Dramas
		getDramaByTitle(title: String!): Dramas

		# user query
		allUsers: [User]!
		getUserByUserId(userId: String!): User
		getUserByEmail(email: String): User
	}

	type Mutation {
		# drama mutation
		addDrama(
			title: String!
			url: String!
			summary: String!
			cover: String!
			youtube: String!
			image1: String!
			image2: String!
			image3: String!
			img1_title: String!
			img2_title: String!
			img3_title: String!
			video1: String!
			video2: String!
			video3: String!
		): Dramas
		removeDrama(_id: ID!): Dramas
		updateDrama(
			_id: ID
			title: String
			url: String
			summary: String
			cover: String
			youtube: String
			image1: String
			image2: String
			image3: String
			img1_title: String
			img2_title: String
			img3_title: String
			video1: String
			video2: String
			video3: String
		): Dramas
	}
`;

module.exports = typeDefs;
