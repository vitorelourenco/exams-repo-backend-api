import { getConnectionManager } from "typeorm";

const DATABASE_URL = process.env.DATABASE_URL;

export default async function connect() {
  const connectionManager = await getConnectionManager();
  const connection = connectionManager.create({
    name: "default",
    type: "postgres",
    url: DATABASE_URL,
    entities: ["src/entities/*.ts"]
  });
  await connection.connect();
  return connection;
}
