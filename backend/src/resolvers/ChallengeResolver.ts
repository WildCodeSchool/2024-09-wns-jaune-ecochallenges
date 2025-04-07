import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Challenge } from '@/entities';

@InputType()
class ChallengeInput {
  @Field()
  label!: string;

  @Field()
  description?: string;

  @Field()
  bannerUrl?: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;
}

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async getChallenges(): Promise<Challenge[]> {
    const challenges = await Challenge.find();
    return challenges;
  }

  @Mutation(() => Challenge)
  async createChallenge(@Arg('data') data: ChallengeInput) {
    try {
      let challenge = new Challenge();
      challenge = Object.assign(challenge, data);
      await challenge.save();

      return challenge;
    } catch (err) {
      throw new Error(`Failed to create challenge: ${err}`);
    }
  }
}
