const mongoose = require('mongoose');

const dramaSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		url: { type: String, required: true, unique: true },
		summary: { type: String, required: true },
		cover: { type: String, required: true },
		youtube: { type: String, required: true },
		image1: { type: String, required: true },
		image2: { type: String, required: true },
		image3: { type: String, required: true },
		img1_title: { type: String, required: true },
		img2_title: { type: String, required: true },
		img3_title: { type: String, required: true },
		video1: { type: String, required: true },
		video2: { type: String, required: true },
		video3: { type: String, required: true },
	},
	{ collection: 'dramas' }
);

const dramas = mongoose.model('dramas', dramaSchema);

module.exports = { dramas };
