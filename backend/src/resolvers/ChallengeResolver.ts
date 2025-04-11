import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Action, Challenge } from '@/entities';
import { In } from 'typeorm';

@InputType()
class ChallengeInput {
  @Field()
  label!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  bannerUrl?: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;

  @Field(() => [ID])
  actions?: Action[];
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
      if (data.actions && data.actions.length) {
        const actions = await Action.findBy({ id: In(data.actions) });
        challenge.actions = actions;
      } else {
        challenge.actions = [];
      }
      await challenge.save();
      return challenge;
    } catch (err) {
      throw new Error(`Echec lors de la création de ce challenge: ${err}`);
    }
  }

  // @Mutation(() => Challenge)
  // async addActionsToChallenge(
  //   @Arg('challengeId', () => ID) challengeId: string,
  //   @Arg('actions', () => [ID]) actions: string[]
  // ): Promise<Challenge> {
  //   try {
  //     const challenge = await Challenge.findOneOrFail({
  //       where: { id: challengeId },
  //       relations: ['actions'],
  //     });
  //     const actionEntities = await Action.findBy({ id: In(actions) });
  //     challenge.actions = [...(challenge.actions || []), ...actionEntities];
  //     await challenge.save();
  //     return challenge;
  //   } catch (err) {
  //     throw new Error(
  //       `Echec lors de l'ajout des actions à ce challenge: ${err}`
  //     );
  //   }
  // }
}
