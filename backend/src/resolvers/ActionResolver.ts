import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Action } from '@/entities';

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
  async createdAction(@Arg('data') data: ActionInput) {
    let action = new Action();
    action = Object.assign(action, data);
    await action.save();
    return action;
  }

  /*   @Query(() => [Int])
  async getAllDurations(): Promise<number[]> {
    const durations = await Action.createQueryBuilder('action')
      .select('DISTINCT action.time', 'time')
      .getRawMany();

    return durations.map((d) => d.time).sort((a, b) => a - b);
  } */
}
