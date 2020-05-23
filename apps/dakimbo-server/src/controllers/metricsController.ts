import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../config';
import { Database } from './../database/database';

class MetricsController {
	static getMetricsFor = async (req: Request, res: Response) => {
		const { username } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		const metricToFind = req.params.metricName;

		try {
			const metricRepo = Database._connection.getRepository(metricToFind);
			const metrics = await metricRepo.find();
			console.log(
				`METRICS FETCHED: ${metricToFind} --- FOUND: ${metrics.length} | USER: ${username}`
			);
			res.send(metrics);
		} catch (error) {
			res.status(500).send(error);
			console.log(`FAILED: Metrics fetch for ${metricToFind}`);
		}
	};
}
export default MetricsController;
