import { User } from '@dakimbo/data';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import config from '../config';
import UserController from './userController';

class AuthController {
	static login = async (req: Request, res: Response) => {
		//Check if username and password are set
		let { username, password } = req.body;
		if (!(username && password)) {
			res.status(400).send();
			console.log(`LOGIN: Username or Password not found; failed to log in!`);
			return;
		}

		//Get user from database
		const userRepository = getRepository(User);
		let user: User;
		try {
			user = await userRepository.findOneOrFail({ where: { username } });
		} catch (error) {
			res.status(401).send();
			console.log(`LOGIN: User ${username} not found; failed to log in!`);
			return;
		}

		//Check if encrypted password match
		if (!UserController.checkIfUnencryptedPasswordIsValid(password, user)) {
			res.status(401).send();
			console.log(`LOGIN: User ${user.username} wrong password; failed to log in!`);

			user.numFailedLogin++;
			await userRepository.save(user); // increment num failed login counter
			return;
		}

		//Sign JWT, valid for 1 hour
		const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, {
			expiresIn: '1h'
		});

		// Delete user pass
		delete user.password;

		console.log(`LOGIN: User ${user.username} successfully logged in!`);
		user.numSuccessfulLogin++;
		userRepository.save(user); // increment num successful login counter

		//Send the jwt in the response
		res.send(Object.assign({ jwt: token }, user));
	};

	static changePassword = async (req: Request, res: Response) => {
		//Get ID from JWT
		const id = res.locals.jwtPayload.userId;

		//Get parameters from the body
		const { oldPassword, newPassword } = req.body;
		if (!(oldPassword && newPassword)) {
			res.status(400).send();
		}

		//Get user from the database
		const userRepository = getRepository(User);
		let user: User;
		try {
			user = await userRepository.findOneOrFail(id);
		} catch (id) {
			res.status(401).send();
		}

		//Check if old password matchs
		if (!UserController.checkIfUnencryptedPasswordIsValid(oldPassword, user)) {
			res.status(401).send();
			return;
		}

		//Validate the model (password length)
		user.password = newPassword;
		const errors = await validate(user);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}
		//Hash the new password and save
		UserController.hashPassword(user);
		userRepository.save(user);

		res.status(204).send();
	};
}
export default AuthController;
