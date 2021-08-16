import { getConnectionManager } from 'typeorm';
import path from 'path';

const { env } = process;
const { DATABASE_URL } = env;

export default async function connect() {
	const connectionManager = getConnectionManager();
	const connection = connectionManager.create({
		name: 'default',
		type: 'postgres',
		url: DATABASE_URL,
		entities: [path.join(__dirname, 'entities', '*.{ts,js}')],
		extra: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
	});
	await connection.connect();
	return connection;
}
