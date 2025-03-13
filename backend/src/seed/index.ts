import { DataSource } from 'typeorm';
import { seedChallenges } from './challenges.seed';

export const runSeeds = async (dataSource: DataSource): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');

    await seedChallenges(dataSource);

    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    throw error;
  }
};
