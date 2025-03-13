import { runSeeds } from './index';
import { dataSource } from '../config/db';

const seed = async () => {
  try {
    await dataSource.initialize();
    await runSeeds(dataSource);
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seed();
