import { Field, InputType, Query, Resolver } from 'type-graphql';
import { User } from '@/entities';

@InputType()
export class UserInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  hashedPassword!: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsersAsUser() {
    const users = await User.find();
    return users;
  }
}
