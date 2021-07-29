import { getConnectionManager } from "typeorm";
import path from 'path';

const DATABASE_URL = process.env.DATABASE_URL;

export default async function connect() {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
    name: "default",
    type: "postgres",
    url: DATABASE_URL,
    entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
  await connection.connect();
  return connection;
}
