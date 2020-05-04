import { Column, Connection, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export interface EntityTransaction {
	relationships?: string[];
	loadAfterCreate?: boolean;

	preProcess?: (entity: any, dbConnection: Connection) => void;
	postProcess?: (entity: any, dbConnection: Connection) => void;
}

export abstract class BaseModel implements EntityTransaction {
	constructor(props?: any) {
		if (!props) return;

		Object.keys(props).forEach(prop => {
			const value = props[prop];
			this[prop] = value;
		});
	}

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@VersionColumn({
		nullable: true
	})
	version?: string;

	@CreateDateColumn()
	createDate?: Date;

	@UpdateDateColumn()
	modifyDate?: Date;

	@Column({
		nullable: true
	})
	createUser?: string;

	@Column({
		nullable: true
	})
	modifyUser?: string;

	relationships?: string[];
	loadAfterCreate?: boolean;
}
