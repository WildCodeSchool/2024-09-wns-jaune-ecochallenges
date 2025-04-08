import { Query, Resolver } from 'type-graphql';
import { Challenge } from '@/entities';

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async getChallenges(): Promise<Challenge[]> {
    const challenges = await Challenge.find();
    return challenges;
  }
}
