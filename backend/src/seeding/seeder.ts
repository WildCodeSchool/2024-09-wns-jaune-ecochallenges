import { dataSource } from '@/config/db';
import { User, Challenge, Action } from '@/entities';
import { usersData, challengesData, actionsData } from '@/seeding/seeds';
import chalk from 'chalk';

chalk.level = 2;

const seedEntity = async (
  entity: any,
  data: any,
  dateFields: string[] = []
) => {
  const repository = dataSource.getRepository(entity);
  const entities = data.map((item: any) => {
    const processedItem = { ...item };
    dateFields.forEach((field) => {
      if (processedItem[field])
        processedItem[field] = new Date(processedItem[field]);
    });
    return Object.assign(new entity(), processedItem);
  });
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
  await seedEntity(Action, actionsData.actions);
  await seedEntity(Challenge, challengesData.challenges, [
    'startDate',
    'endDate',
  ]);

  await dataSource.destroy();

  console.log(chalk.green('✅ Database seeding complete'));
};

seedDatabase().catch((error) => console.error('❌ Seeding failed', error));
