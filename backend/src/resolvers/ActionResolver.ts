import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Action, Tag } from '@/entities';

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

  @Mutation(() => Action)
  async createAction(@Arg('data') data: ActionInput) {
    try {
      let action = new Action();
      action = Object.assign(action, data);
      await action.save();

      return action;
    } catch (error) {
      throw new Error('Echec lors de la création de cette action: ${err}');
    }
  }
}
