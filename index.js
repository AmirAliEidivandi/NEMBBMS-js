import mongoose from 'mongoose';
import * as url from 'url';
import config from './config.js';
import { Logger } from './common/index.js';
import app from './app.js';

const connectMongoDB = () => {

	const connectionOptions = {
		autoIndex: false,
		connectTimeoutMS: 10000,
		socketTimeoutMS: 60000,
		family: 4,
		dbName: config.DBNAME
	};
	const mondoDBURI = config.MONGO_URI ?? '';
	const mongoHost = new url.URL(mondoDBURI).host;
	mongoose.set('strictQuery', true);

	return new Promise(async (resolve, reject) => {
		try {
			await mongoose.connect(mondoDBURI, connectionOptions);
			Logger.success(`Connected to mongoDB at ${mongoHost}`);
			resolve(true);
		} catch (err) {
			Logger.error('Error connecting mongoDB => ', err);
			reject(true);
		}
	});
};

const startServer = async () => {
	try {
		await connectMongoDB();
		app.listen(config.PORT, () => {
			Logger.success(`App listening on port ${config.PORT}`);
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		Logger.error(`Could not start the app: `, error);
	}
};

startServer();