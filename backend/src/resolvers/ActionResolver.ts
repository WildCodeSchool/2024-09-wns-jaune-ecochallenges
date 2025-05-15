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

@InputType()
export class ActionInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  requires_view!: boolean;

  @Field()
  level!: number;

  @Field()
  icon!: string;

  @Field()
  time!: number;

  @Field(() => [ID])
  tags!: number[];
}

@Resolver(Action)
export class ActionResolver {
  @Query(() => [Action])
  async getActions() {
    const actions = await Action.find({ relations: ['tags'] });
    return actions;
  }

  @Query(() => Action)
  async getActionById(@Arg('id') id: string) {
    const action = await Action.findOneOrFail({
      where: { id },
      relations: ['tags'],
    });
    return action;
  }

  @Query(() => [Action])
  async getActionsByChallengeId(@Arg('challengeId') challengeId: string): Promise<Action[]> {
    const challenge = await Challenge.findOneOrFail({
      where: { id: challengeId },
      relations: ['actions', 'actions.tags'],
    });
    return challenge.actions || [];
  }

  @Mutation(() => Action)
  async createdAction(@Arg('data') data: ActionInput) {
    let action = new Action();
    action = Object.assign(action, data);
    await action.save();
    return action;
  }
}
