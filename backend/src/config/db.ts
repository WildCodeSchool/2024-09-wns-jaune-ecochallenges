import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../entities/User';
import { Challenge } from '../entities/Challenge';

config();
const { DB_HOST, DB_PASSWORD, DB_USER, DB_SCHEMA, DB_PORT } = process.env;

export const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
  port: Number(DB_PORT),
  entities: [User, Challenge],
  synchronize: true,
  // migrations: ["./bdd/migrations/*.ts"],
  // migrationsTableName: "migrations",
});
