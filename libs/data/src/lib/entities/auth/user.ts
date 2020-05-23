import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, Unique, EntitySchema } from 'typeorm';

import { BaseModel } from '../base';

@Entity({
	name: 'auth_user',
	orderBy: {
		username: 'ASC'
	}
})
@Unique(['username'])
export class User extends BaseModel {
	constructor(props?: User) {
		super(props);
	}

	@Column()
	@Length(4, 20)
	username?: string;

	@Column()
	@Length(4, 100)
	password?: string;

	@Column({
		length: 255
	})
	email?: string;

	@Column()
	@IsNotEmpty()
	role?: string;

	@Column({
		nullable: true,
		default: 0
	})
	numSuccessfulLogin?: number;

	@Column({
		nullable: true,
		default: 0
	})
	numFailedLogin?: number;

	jwt?: string;
	expiry?: Date;
}