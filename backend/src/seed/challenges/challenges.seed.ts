import { DataSource } from 'typeorm';
import { Challenge } from '../../entities/Challenge';
import * as challengesData from './challenges.json';

type ChallengeInput = Omit<
  Challenge,
  'id' | 'createdAt' | 'startDate' | 'endDate'
> & {
  startDate: string;
  endDate: string;
};

export const seedChallenges = async (dataSource: DataSource): Promise<void> => {
  const challengeRepository = dataSource.getRepository(Challenge);
  await challengeRepository.delete({});

  const challenges = (
    challengesData as { challenges: ChallengeInput[] }
  ).challenges.map((challenge) =>
    Object.assign(new Challenge(), {
      ...challenge,
      startDate: new Date(challenge.startDate),
      endDate: new Date(challenge.endDate),
    })
  );

  await challengeRepository.save(challenges);
  console.log(`✅ Challenges seeded successfully`);
};
