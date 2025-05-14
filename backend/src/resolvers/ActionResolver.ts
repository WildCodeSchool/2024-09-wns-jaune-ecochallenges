import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Action } from '@/entities';
import { email } from '@/services/email/emailService';

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

  @Mutation(() => Action)
  async createdAction(@Arg('data') data: ActionInput) {
    //email.welcomeEmail.send('marcos.marjorie@hotmail.fr', { url: 'lalalall ' });
    // email.invitationEmail.send('marcos.marjorie@hotmail.fr', {
    //   ecochallengeName: 'lala Challenge',
    //   startDate: '02/06/2025',
    //   endDate: '14/06/2025',
    //   loginUrl:
    //     'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    // });
    email.challengeCreatedEmail.send('marcos.marjorie@hotmail.fr', {
      ecochallengeName: 'lala Challenge',
      startDate: '02/06/2025',
      endDate: '14/06/2025',
    });
    let action = new Action();
    action = Object.assign(action, data);
    await action.save();
    return action;
  }
}
