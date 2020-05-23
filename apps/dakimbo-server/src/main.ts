require('./utilities/logStamp');
require('dotenv').config();

import 'reflect-metadata';

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { Database } from './database/database';
import routes from './routes';
import config from './config';

(async () => {
	const db = new Database();
	await db.connect(<any>config.dbOptions);

	const app = express();
	const port = process.env.port || 1337;

	// MIDDLEWARE
	app.use(cors());
	app.use(helmet());
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use(express.static(__dirname + '/public'));
	app.use('/', routes);
	app.get('*', (req, res) => {
		res.sendFile(__dirname + '/public/index.html');
	});

	const server = app.listen(port, () => {
		return console.log(`Server is listening on ${port}`);
	});
	server.on('error', console.error);
})();
