import { DataSource } from 'typeorm';
import { Challenge } from '../entities/Challenge';
import * as challengesData from './data/challenges.json';

interface ChallengeData {
  label: string;
  description: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
}

export const seedChallenges = async (dataSource: DataSource): Promise<void> => {
  const challengeRepository = dataSource.getRepository(Challenge);

  // Delete existing challenges
  await challengeRepository.delete({});

  // Create new challenges
  const challenges = (
    challengesData as { challenges: ChallengeData[] }
  ).challenges.map((challenge: ChallengeData) => {
    const newChallenge = new Challenge();
    newChallenge.label = challenge.label;
    newChallenge.description = challenge.description;
    newChallenge.bannerUrl = challenge.bannerUrl;
    newChallenge.startDate = new Date(challenge.startDate);
    newChallenge.endDate = new Date(challenge.endDate);
    return newChallenge;
  });

  // Save all challenges
  await challengeRepository.save(challenges);

  console.log(`✅ Challenges seeded successfully`);
};
