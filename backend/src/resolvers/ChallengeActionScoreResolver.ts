import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Resolver,
} from 'type-graphql';
import { Action, Challenge, User, UserRole } from '@/entities';
import { ChallengeActionScore } from '@/entities/ChallengeActionScore';

@InputType()
export class ChallengeActionScoreInput {
  @Field()
  isValidated!: boolean;

  @Field(() => ID)
  action!: string;

  @Field(() => ID)
  challenge!: string;

  @Field(() => ID)
  validatedBy!: string;
}

@Resolver(ChallengeActionScore)
export class ChallengeActionScoreResolver {
  @Mutation(() => ChallengeActionScore)
  async validatedAction(
    @Arg('data') data: ChallengeActionScoreInput,
    @Ctx() { user }: { user: User }
  ): Promise<ChallengeActionScore> {
    try {
      const challenge = await Challenge.findOneOrFail({
        where: { id: data.challenge },
        relations: ['actions', 'members', 'owner'],
      });
      console.log('🚀 ~ ChallengeActionScoreResolver ~ challenge:', challenge);

      const actionList = challenge.actions?.map((action) => action.id);

      if (!actionList?.map(Number).includes(Number(data.action))) {
        throw new Error('Action non trouvée');
      }

      const action = await Action.findOneOrFail({
        where: { id: data.action },
      });

      console.log(
        '🚀 ~ ChallengeActionScoreResolver ~ challenge.owner?.id:',
        challenge.owner?.id
      );
      const memberList = challenge.members?.map((member) => member.id);
      if (
        !memberList?.includes(data.validatedBy) ||
        (challenge.owner?.id !== user.id && user.role !== UserRole.ADMIN)
      ) {
        throw new Error(
          `Vous ne faites pas parti de ce challenge, vous ne pouvez pas valider cette action`
        );
      }

      let challengeActionScore = new ChallengeActionScore();
      challengeActionScore = Object.assign(challengeActionScore, data);
      challengeActionScore.points = action.points;
      await challengeActionScore.save();

      return challengeActionScore;
    } catch (error) {
      throw new Error(`Echec lors de la création de cette action: ${error}`);
    }
  }
}
