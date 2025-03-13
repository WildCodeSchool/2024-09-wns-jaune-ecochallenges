import * as fs from 'fs';
import { User } from '../entities/User';

import { dataSource } from '../config/db';

/**
 * Reads a JSON file from the specified file path and parses its content.
 *
 * @param {string} filePath - The path to the JSON file.
 * @returns {any} The parsed JSON content.
 */
const loadJSON = (filePath: string) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

/**
 * Seeds the database with initial data.
 *
 * This function initializes the database connection, loads data from  JSON files,
 * inserts the data into the database, and then closes the connection.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the seeding is complete.
 */
async function seedDatabase() {
  console.log('Init database database...');
  await dataSource.initialize();

  console.log('Cleaning database...');
  await dataSource.manager.delete(User, {});
  console.log('🔄 Seeding database...');

  /**
   * Users seed
   */
  const users = loadJSON(__dirname + '/seeds/users.seed.json');

  const userRepository = dataSource.getRepository(User);
  for (const userData of users) {
    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
  }
  console.log(`✅ ${users.length} users added.`);

  //Add your seeding here

  await dataSource.destroy();
}
// Exécuter le script
seedDatabase().catch((error) => console.error('❌ Seeding failed', error));
