import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	// Get the jwt token from the head
	const authHeader = <string>req.headers['authorization'];
	if (!authHeader || !authHeader.includes('Bearer')) {
		res.status(408).send('No Authorization Header or Bearer token presented!');
		return;
	}

	const token = authHeader.split('Bearer')[1].trim();
	let jwtPayload;

	// Try to validate the token and get data
	try {
		jwtPayload = <any>jwt.verify(token, config.jwtSecret);
		res.locals.jwtPayload = jwtPayload;
	} catch (error) {
		// If token is not valid, respond with 401 (unauthorized)
		res.status(401).send();
		return;
	}

	// The token is valid for 1 hour
	// We want to send a new token on every request
	const { userId, username } = jwtPayload;
	const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
		expiresIn: '1h'
	});
	res.setHeader('token', newToken);

	// Call the next middleware or controller
	next();
};
