import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../entities/User';

config();
const { DB_HOST, DB_PASSWORD, DB_USER, DB_SCHEMA } = process.env;

export const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
  port: 5432,
  entities: [User],
  synchronize: true,
  // migrations: ["./bdd/migrations/*.ts"],
  // migrationsTableName: "migrations",
});
