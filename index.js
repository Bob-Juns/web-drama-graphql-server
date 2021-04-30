const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const schema = require('./graphql/schema');
const { ApolloServer } = require('apollo-server-express');
const config = require('./config/key');

dotenv.config();

mongoose.Promise = global.Promise;
mongoose
	.connect(config.mongoURI, {
		useFindAndModify: false,
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('mongoDB Connected!'))
	.catch((err) => console.log(err));

app.use(cors());

const server = new ApolloServer({
	schema,
	playground: true,
	introspection: true,
});

server.applyMiddleware({
	app,
	path: '/',
});

const port = process.env.PORT || 5555;

app.listen(port, () => console.log(`server is running on port ${port}`));
