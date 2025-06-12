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
import { Action, Tag, User, UserRole } from '@/entities';
import { In } from 'typeorm';

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
  tags?: Tag[];
}

@Resolver(Action)
export class ActionResolver {
  @Query(() => [Action])
  async getActions() {
    const actions = await Action.find({ relations: ['tags', 'createdBy'] });
    return actions;
  }

  @Query(() => Action)
  async getAction(@Arg('id', () => ID) id: string): Promise<Action> {
    const action = await Action.findOneOrFail({
      where: { id },
      relations: ['tags', 'createdBy'],
    });
    return action;
  }

  @Mutation(() => Action)
  async createAction(
    @Arg('data') data: ActionInput,
    @Ctx() { user }: { user: User }
  ) {
    try {
      let action = new Action();
      action = Object.assign(action, data);
      action.createdBy = user;
      if (data.tags && data.tags.length) {
        const tags = await Tag.findBy({ id: In(data.tags) });
        action.tags = tags;
      } else {
        action.tags = [];
      }
      await action.save();

      return action;
    } catch (error) {
      throw new Error(`Echec lors de la création de cette action: ${error}`);
    }
  }

  @Mutation(() => Boolean)
  async deleteAction(@Arg('id', () => ID) id: string): Promise<boolean> {
    try {
      const action = await Action.findOneOrFail({ where: { id } });
      await action.remove();
      return true;
    } catch (error) {
      throw new Error(`Echec lors de la suppression de cette action: ${error}`);
    }
  }

  @Mutation(() => Action)
  async updateAction(
    @Arg('id', () => ID) id: string,
    @Arg('data') data: ActionInput,
    @Ctx() { user }: { user: User }
  ): Promise<Action> {
    try {
      const action = await Action.findOneOrFail({
        where: { id },
        relations: ['createdBy', 'tags'],
      });
      if (action.createdBy?.id !== user.id && user.role !== UserRole.ADMIN) {
        throw new Error(
          `Vous n'avez pas les droits pour modifier cet éco-geste: action.createdBy.id: ${action.createdBy?.id} !== user.id: ${user.id}`
        );
      }

      Object.assign(action, data);

      if (data.tags && data.tags.length) {
        const tags = await Tag.findBy({ id: In(data.tags) });
        action.tags = tags;
      } else {
        action.tags = [];
      }
      await action.save();
      return action;
    } catch (error) {
      throw new Error(
        `Echec lors de la mise à jour de cet éco-geste: ${error}`
      );
    }
  }
}
