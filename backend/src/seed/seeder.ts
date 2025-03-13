import { dataSource } from '../config/db';
import { seedChallenges } from './challenges/challenges.seed';

const seed = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');

    await dataSource.initialize();
    await seedChallenges(dataSource);

    console.log('✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  }
};

seed();
