import { getRepository } from 'typeorm';
import { User } from '@dakimbo/data';
import UserController from '../../controllers/userController';

export async function createAdminUser() {
	console.log('Creating Admin User...');

	let user = new User();
	user.username = 'admin';
	user.password = 'admin';
	UserController.hashPassword(user);
	user.role = 'superadmin';
	user.email = 'aDm!n@admin.com';
	const userRepository = getRepository(User);
	const adminUser = await userRepository.save(user);

	console.log('Created Admin User! ', JSON.stringify(adminUser));
}
