import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Action, Challenge, User, UserRole } from '@/entities';
import { In } from 'typeorm';
import { email } from '@/services/email/emailService';

@InputType()
class ChallengeInput {
  @Field({ nullable: true })
  id?: string;

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

  @Field(() => [ID])
  members?: User[];
}

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async getChallenges(@Ctx() { user }: { user: User }): Promise<Challenge[]> {
    const challenges = await Challenge.find({
      relations: ['actions', 'actions.tags', 'members', 'owner'],
    });

    return challenges.filter((challenge) => {
      if (challenge.isPublic) return true;
      if (user)
        return challenge.members?.some((member) => member.id === user.id);
    });
  }

  @Query(() => Challenge)
  async getChallenge(@Arg('id', () => ID) id: string): Promise<Challenge> {
    const challenge = await Challenge.findOneOrFail({
      where: { id },
      relations: ['actions', 'members', 'owner'],
    });
    return challenge;
  }

  @Mutation(() => Challenge)
  async createChallenge(
    @Arg('data') data: ChallengeInput,
    @Ctx() { user }: { user: User }
  ) {
    try {
      console.log('🚀 ~ ChallengeResolver ~ data:', data);
      let challenge = new Challenge();
      challenge = Object.assign(challenge, data);
      challenge.owner = user;

      if (data.actions && data.actions.length) {
        const actions = await Action.findBy({ id: In(data.actions) });
        challenge.actions = actions;
      } else {
        challenge.actions = [];
      }

      if (data.members && data.members.length) {
        const members = await User.findBy({ id: In(data.members) });
        challenge.members = members;
      } else {
        challenge.members = [];
      }

      await challenge.save();
      email.challengeCreatedEmail.send('nigont@gmail.com', {
        ecochallengeName: challenge.label,
        startDate: challenge.startDate.toISOString(),
        endDate: challenge.endDate.toISOString(),
      });
      return challenge;
    } catch (err) {
      throw new Error(`Echec lors de la création de ce challenge: ${err}`);
    }
  }

  @Mutation(() => Challenge)
  async updateChallenge(
    @Arg('id', () => ID) id: string,
    @Arg('data') data: ChallengeInput,
    @Ctx() { user }: { user: User }
  ): Promise<Challenge> {
    try {
      const challenge = await Challenge.findOneOrFail({
        where: { id },
        relations: ['owner'],
      });
      if (challenge.owner?.id !== user.id && user.role !== UserRole.ADMIN) {
        throw new Error(
          `Vous n'avez pas les droits pour modifier ce challenge: challenge.owner.id: ${challenge.owner?.id} !== user.id: ${user.id}`
        );
      }

      Object.assign(challenge, data);

      if (data.actions && data.actions.length) {
        const actions = await Action.findBy({ id: In(data.actions) });
        challenge.actions = actions;
      } else {
        challenge.actions = [];
      }

      if (data.members?.length) {
        const members = await User.findBy({ id: In(data.members) });
        challenge.members = members;
      } else {
        challenge.members = [];
      }

      await challenge.save();
      return challenge;
    } catch (err) {
      throw new Error(`Echec lors de la mise à jour de ce challenge: ${err}`);
    }
  }

  @Mutation(() => Boolean)
  async deleteChallenge(@Arg('id', () => ID) id: string): Promise<boolean> {
    try {
      const challenge = await Challenge.findOneOrFail({ where: { id } });
      await challenge.remove();
      return true;
    } catch (err) {
      throw new Error(`Echec lors de la suppression de ce challenge: ${err}`);
    }
  }
}
