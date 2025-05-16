import { dataSource } from '@/config/db';
import { BaseEntity } from 'typeorm';
import chalk from 'chalk';

chalk.level = 2;

type CleanEntity<T> = {
  [K in keyof Omit<T, keyof BaseEntity> as T[K] extends Function
    ? never
    : K]: T[K];
};

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

export const seedDb = async (
  seedCallback: (seedEntityFn: typeof seedEntity) => Promise<void>
): Promise<void> => {
  try {
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
