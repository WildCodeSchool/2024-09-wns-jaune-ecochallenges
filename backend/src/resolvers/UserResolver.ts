import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '@/entities';
import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';

@InputType()
export class SignUpUserInput {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  hashedPassword!: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  email!: string;

  @Field()
  hashedPassword!: string;
}

const tokenVerif = (user: User, res: Response, jwtSecret: string) => {
  const tokenContent = {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    roles: user.roles,
  };

  // Authentification
  const token = jwt.sign(tokenContent, jwtSecret);
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  const profile = {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
  };

  return profile;
};

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsersAsUser() {
    const users = await User.find();
    return users;
  }

  @Mutation(() => String)
  async signUp(
    @Arg('data') userSingUpData: SignUpUserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.JWT_SECRET) throw new Error('Missing env variable');

    const hashedPassword = await argon.hash(userSingUpData.hashedPassword);

    const user = await User.save({
      email: userSingUpData.email,
      hashedPassword: hashedPassword,
      firstname: userSingUpData.firstname,
      lastname: userSingUpData.lastname,
    });

    return JSON.stringify(tokenVerif(user, res, process.env.JWT_SECRET));
  }

  @Mutation(() => String)
  async logIn(
    @Arg('data') userLogInData: LoginUserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.JWT_SECRET) throw new Error('Missing env variable');

    const user = await User.findOneByOrFail({ email: userLogInData.email });
    const isValid = await argon.verify(
      user.hashedPassword,
      userLogInData.hashedPassword
    );

    if (!isValid) throw new Error('Wrong password');

    return JSON.stringify(tokenVerif(user, res, process.env.JWT_SECRET));
  }
}
