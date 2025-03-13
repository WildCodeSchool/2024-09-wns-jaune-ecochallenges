import * as fs from 'fs';
import { User } from '../entities/User';

import { dataSource } from '../config/db';
import { Challenge } from '../entities/Challenge';

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
 * This function initializes the database connection, loads user data from a JSON file,
 * inserts the data into the database, and then closes the connection.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the seeding is complete.
 */
async function seedDatabase() {
  //const entities = [User, Challenge];

  console.log('Init database database...');
  await dataSource.initialize();

  console.log('Cleaning database...');
  await dataSource.manager.delete(User, {});
  await dataSource.manager.delete(Challenge, {});
  console.log('🔄 Seeding database...');

  const users = loadJSON(__dirname + '/seeds/users.seed.json');
  console.log(users);
  const seedUsers = async () => {
    const userRepository = dataSource.getRepository(User);

    // Load user data from JSON or any other source
    const userData = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        hashedPassword: 'plain-text-password', // This will be hashed by the lifecycle hook
      },
      // Add more users as needed
    ];

    for (const data of userData) {
      // Create a new user instance
      const user = userRepository.create(data);

      // Save the user, triggering the @BeforeInsert hook
      await userRepository.save(user);
    }
  };
  await seedUsers();
  const challenges = loadJSON(__dirname + '/seeds/challenges.seed.json');
  console.log(challenges);

  await dataSource.getRepository(User).save(users);
  console.log(`✅ ${users.length} users added.`);

  await dataSource.getRepository(Challenge).save(challenges);
  console.log(`✅ ${challenges.length} challenges added.`);

  console.log('🎉 Database seeding complete!');
  await dataSource.destroy();
}

// Exécuter le script
seedDatabase().catch((error) => console.error('❌ Seeding failed', error));
