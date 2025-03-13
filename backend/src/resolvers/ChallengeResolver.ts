import { Field, InputType, Query, Resolver } from 'type-graphql';

import { Challenge } from '../entities/Challenge';
import { User } from '../entities/User';

@InputType()
export class ChallengeInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => User)
  user!: User;
}

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async getChallengesAsChallenge() {
    const challenges = await Challenge.find({ relations: ['user'] });
    return challenges;
  }
}
