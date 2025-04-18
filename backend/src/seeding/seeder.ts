import { dataSource } from '@/config/db';
import { User, Challenge, Action, Tag } from '@/entities';
import {
  usersData,
  challengesData,
  actionsData,
  tagsData,
} from '@/seeding/seeds';
import chalk from 'chalk';

chalk.level = 2;

const seedEntity = async (
  entity: any,
  data: any,
  options: {
    relations?: { name: string; entity: any }[];
    dates?: string[];
  } = {}
) => {
  const repository = dataSource.getRepository(entity);
  const entities = await Promise.all(
    data.map(async (item: any) => {
      const processedItem = { ...item };

      if (options.relations) {
        for (const {
          name: relationName,
          entity: relationEntity,
        } of options.relations) {
          if (!processedItem[relationName]) continue;
          processedItem[relationName] = await Promise.all(
            processedItem[relationName].map((id: string) =>
              dataSource.getRepository(relationEntity).findOneBy({ id })
            )
          );
        }
      }

      if (options.dates) {
        options.dates.forEach((date) => {
          if (!processedItem[date]) return;
          processedItem[date] = new Date(processedItem[date]);
        });
      }

      return Object.assign(new entity(), processedItem);
    })
  );

  await repository.save(entities);
  console.log(`✔︎ ${entities.length} ${entity.name} added!`);
};

const seedDatabase = async () => {
  console.log('🔄 Initializing database...');
  await dataSource.initialize();
  console.log('🧼 Cleaning database...');
  await dataSource.dropDatabase();
  console.log('🏗️  Creating database...');
  await dataSource.synchronize();

  console.log('🌱 Seeding database...');

  // Add your seeds here
  await seedEntity(User, usersData.users);
  await seedEntity(Tag, tagsData.tags);
  await seedEntity(Action, actionsData.actions, {
    relations: [{ name: 'tags', entity: Tag }],
  });
  await seedEntity(Challenge, challengesData.challenges, {
    relations: [{ name: 'actions', entity: Action }],
    dates: ['startDate', 'endDate'],
  });

  await dataSource.destroy();

  console.log(chalk.green('✅ Database seeding complete'));
};

seedDatabase().catch((error) => console.error('❌ Seeding failed', error));
