import { User } from '../entities/User';
import { dataSource } from '../config/db';
import * as usersData from './seeds/users.seed.json';
import * as challengesData from './seeds/challenges.seed.json';
import { Challenge } from '../entities/Challenge';

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
  await seedEntity(Challenge, challengesData.challenges, [
    'startDate',
    'endDate',
  ]);

  await dataSource.destroy();
};

seedDatabase().catch((error) => console.error('❌ Seeding failed', error));
