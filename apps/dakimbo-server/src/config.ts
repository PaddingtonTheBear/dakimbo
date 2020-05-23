import { entityMap } from '@dakimbo/data';

const isProd = process.env.IS_PROD === 'true';
const pathToEntities = isProd ? './database/entities/**/*.js' : './database/entities/**/*.ts';
const pathToMigrations = isProd ? './database/migrations/**/*.js' : './database/migrations/**/*.ts';

export default {
	isProd: isProd,

	httpsOpts: {
		// Server SSL private key and certificate
		// key: fs.readFileSync(__dirname + '/security/dev-cert.key'),
		// cert: fs.readFileSync(__dirname + '/security/dev-cert.pem'),
		// issuer/CA certificate against which the client certificate will be
		// validated. A certificate that is not signed by a provided CA will be
		// rejected at the protocol layer.
		// ca: fs.readFileSync(__dirname + '/config/certs/ca-cert.pem'),
		// request a certificate, but don't necessarily reject connections from
		// clients providing an untrusted or no certificate. This lets us protect only
		// certain routes, or send a helpful error message to unauthenticated clients.
		// requestCert: true,
		// rejectUnauthorized: true,
	},

	dbOptions: {
		type: process.env.DB_TYPE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE || 'dakimbo-server',
		synchronize: true,
		logging: isProd ? false : false,
		entities: Object.values(entityMap)
		// entities: [path.join(__dirname, pathToEntities)],
		// migrations: [path.join(__dirname, pathToMigrations)],
		// migrationsDir: 'migration'
	},

	jwtSecret: process.env.JWT_SECRET || 'CHANGE_ME'
};
