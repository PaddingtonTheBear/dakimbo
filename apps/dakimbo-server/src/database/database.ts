import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export class Database {
	static _connection: Connection;
	static _dbOptions: ConnectionOptions | any;

	constructor() {}

	async connect(dbOptions: ConnectionOptions) {
		Database._dbOptions = dbOptions;
		try {
			console.log(
				`Connecting to ${Database._dbOptions.type} Database: ${Database._dbOptions.database} at ${Database._dbOptions.host}:${Database._dbOptions.port} with user: ${Database._dbOptions.username}`
			);
			Database._connection = await createConnection(Database._dbOptions);

			await this.runMigrations();

			console.log(`Connection to database established!`);
		} catch (e) {
			console.log(
				`Error Connecting to ${Database._dbOptions.host}:${Database._dbOptions.port}\n`,
				e
			);
		}
	}

	async runMigrations() {
		const migrations = [];
		if (migrations.length) {
			console.log(`Running migrations...`);
			await Promise.all(migrations);
			console.log(`Migrations finished!`);
		}
	}
}
