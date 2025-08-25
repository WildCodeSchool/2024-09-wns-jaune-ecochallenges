import { BaseEntity, DataSource } from 'typeorm';
import { Client } from 'pg';

import chalk from 'chalk';
import {
  Action,
  Challenge,
  Tag,
  User,
  UserActionChallengeScore,
} from '@/entities';

chalk.level = 2;

const { DB_HOST, DB_PASSWORD, DB_USER, DB_SCHEMA, DB_PORT } = process.env;

const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
  port: Number(DB_PORT),
  entities: [User, Challenge, Action, Tag, UserActionChallengeScore],
  synchronize: true,
  // migrations: ["./bdd/migrations/*.ts"],
  // migrationsTableName: "migrations",
});

/* type CleanEntity<T> = {
  [K in keyof Omit<T, keyof BaseEntity> as T[K] extends Function
    ? never
    : K]: T[K];
}; */

// Type to extract entity relation keys
type EntityRelationKeys<T> = keyof {
  [K in keyof T as NonNullable<T[K]> extends
    | BaseEntity
    | BaseEntity[]
    | Promise<BaseEntity | BaseEntity[]>
    ? K
    : never]: T[K];
};

// Type to extract Date property keys
type DatePropertyKeys<T> = keyof {
  [K in keyof T as T[K] extends Date ? K : never]: T[K];
};

const seedEntity = async <T extends BaseEntity>(
  entity: new () => T,
  data: Record<any, any>[],
  options?: {
    relations?: {
      name: EntityRelationKeys<T>;
      entity: new () => BaseEntity;
      property?: string;
      type?: 'manyToMany' | 'manyToOne';
    }[];
    dates?: DatePropertyKeys<T>[];
  }
): Promise<void> => {
  try {
    const repository = dataSource.getRepository(entity);
    const entities = await Promise.all(
      data.map(async (item) => {
        const processedItem = { ...item };

        // RELATIONS
        if (options?.relations) {
          for (const {
            name: relationName,
            entity: relationEntity,
            property,
            type,
          } of options.relations) {
            if (!processedItem[relationName]) continue;

            const key = property || 'id';
            const repository = dataSource.getRepository(relationEntity);

            if (!type || type === 'manyToMany') {
              processedItem[relationName] = await Promise.all(
                processedItem[relationName].map((value: string) =>
                  repository.findOneBy({ [key]: value })
                )
              );
            } else if (type === 'manyToOne') {
              processedItem[relationName] = await repository.findOneBy({
                [key]: processedItem[key],
              });
            }
          }
        }

        // DATES
        if (options?.dates) {
          options.dates.forEach((dateField) => {
            if (processedItem[dateField]) {
              processedItem[dateField] = new Date(processedItem[dateField]);
            }
          });
        }

        return Object.assign(new (entity as any)(), processedItem);
      })
    );

    await repository.save(entities);
    console.log(
      chalk.green(`✔︎ ${entities.length} ${(entity as any).name}s added!`)
    );
  } catch (error) {
    console.error(
      chalk.red(`❌ Error seeding ${(entity as any).name}:`),
      error
    );
    throw error;
  }
};

async function ensureDatabaseExists(): Promise<void> {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: 'postgres', // connect to default DB to create target DB
  });

  await client.connect();

  const result = await client.query(
    `SELECT 1 FROM pg_database WHERE datname=$1`,
    [process.env.DB_SCHEMA]
  );

  if (result.rowCount === 0) {
    await client.query(
      `CREATE DATABASE "${process.env.DB_SCHEMA}" OWNER "${process.env.DB_USER}"`
    );
    console.log(chalk.blue(`📦 Created database "${process.env.DB_SCHEMA}"`));
  }

  await client.end();
}

export const seedDb = async (
  seedCallback: (seedEntityFn: typeof seedEntity) => Promise<void>
): Promise<void> => {
  try {
    console.log('🔄 Ensuring database exists...');
    await ensureDatabaseExists();

    console.log('🔄 Initializing database...');
    await dataSource.initialize();

    console.log('🧼 Cleaning database...');
    await dataSource.dropDatabase();

    console.log('🏗️  Creating database...');
    await dataSource.synchronize();

    console.log('🌱 Seeding database...');
    await seedCallback(seedEntity);

    await dataSource.destroy();
    console.log(chalk.green('✅ Database seeding complete'));
  } catch (error) {
    console.error(chalk.red('❌ Seeding failed'), error);
    process.exit(1);
  }
};
