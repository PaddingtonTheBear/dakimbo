import { User } from '@dakimbo/data';
import * as bcrypt from 'bcryptjs';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import config from '../config';

class UserController {
	static listAll = async (req: Request, res: Response) => {
		//Get users from database
		const userRepository = getRepository(User);
		const users = await userRepository.find({
			select: ['id', 'username', 'role', 'email', 'createDate'] //We dont want to send the passwords on response
		});

		//Send the users object
		res.send(users);
	};

	static getOneById = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id: number = +req.params.id;

		//Get the user from database
		const userRepository = getRepository(User);
		try {
			const user = await userRepository.findOneOrFail(id, {
				select: ['id', 'username', 'role'] //We dont want to send the password on response
			});
			res.status(201).send(user);
		} catch (error) {
			res.status(404).send('User not found');
		}
	};

	static newUser = async (req: Request, res: Response) => {
		//Get parameters from the body
		let { username, password, email, role } = req.body;
		let user = new User();
		user.username = username;
		user.password = password;
		user.email = email;
		user.role = role;

		// const { adminUser } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		//Validade if the parameters are ok
		const errors = await validate(user);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		//Hash the password, to securely store on DB
		UserController.hashPassword(user);

		//Try to save. If fails, the username is already in use
		const userRepository = getRepository(User);
		try {
			await userRepository.save(user);
		} catch (e) {
			res.status(409).send('Username already in use!');
			return;
		}

		delete user.password;

		//If all ok, send 201 response
		console.log(`CREATE USER: ${user.username}`);
		res.status(201).send(user);
	};

	static editUser = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id;

		//Get values from the body
		const { username, password, role } = req.body;

		const { adminUser } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		//Try to find user on database
		const userRepository = getRepository(User);
		let user;
		try {
			user = await userRepository.findOneOrFail(id);
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send('User not found');
			return;
		}

		//Validate the new values on model
		user.username = username;
		user.role = role;

		if (password) {
			user.password = password;
			UserController.hashPassword(user);
		}

		const errors = await validate(user);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		//Try to save, if fails, that means username already in use
		try {
			await userRepository.save(user);
		} catch (e) {
			res.status(409).send('username already in use');
			return;
		}
		//After all send a 204 (no content, but accepted) response
		console.log(`EDIT USER: ${user.username} | BY ADMIN: ${adminUser}`);
		res.status(204).send();
	};

	static deleteUser = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id;

		const { adminUser } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);

		const userRepository = getRepository(User);
		let user: User;
		try {
			user = await userRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send('User not found');
			return;
		}
		userRepository.delete(id);

		//After all send a 204 (no content, but accepted) response
		console.log(`DELETE USER: ${user.username} | BY ADMIN: ${adminUser}`);
		res.status(204).send();
	};

	static getCurrentUser = async (req: Request, res: Response) => {
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

		const userRepository = getRepository(User);
		let user: User;
		try {
			user = await userRepository.findOneOrFail(userId);
		} catch (error) {
			res.status(404).send('User not found');
			return;
		}

		delete user.password;

		res.status(201).send(user);
	};

	static hashPassword(userEntity: User) {
		userEntity.password = bcrypt.hashSync(userEntity.password, 8);
	}

	static checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, userEntity: User) {
		return bcrypt.compareSync(unencryptedPassword, userEntity.password);
	}
}

export default UserController;
