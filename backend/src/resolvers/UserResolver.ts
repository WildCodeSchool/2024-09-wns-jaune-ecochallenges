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

const getProfil = (user: User) => {
  const profile = {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
  };

  return profile;
};

const verifyToken = (user: User, jwtSecret: string): string => {
  const tokenContent = {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    roles: user.roles,
  };
  const access_token = jwt.sign(tokenContent, jwtSecret);

  return access_token;
};

const setTokenInCookie = (res: Response, access_token: string): void => {
  if (!process.env.COOKIE_TTL) throw new Error('Missing ttl conf key!');
  const myDate = new Date();
  const expiryTStamp = myDate.getTime() + Number(process.env.COOKIE_TTL);
  myDate.setTime(expiryTStamp);
  res.setHeader(
    'Set-Cookie',
    `access_token=${access_token};secure;httpOnly;SameSite=Strict;expires=${myDate.toUTCString()}`
  );
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
    try {
      if (!process.env.JWT_SECRET) throw new Error('Missing env variable');

      const hashedPassword = await argon.hash(userSingUpData.hashedPassword);

      const user = await User.save({
        email: userSingUpData.email,
        hashedPassword: hashedPassword,
        firstname: userSingUpData.firstname,
        lastname: userSingUpData.lastname,
      });

      const access_token = verifyToken(user, process.env.JWT_SECRET);
      setTokenInCookie(res, access_token);

      const profil = getProfil(user);

      return JSON.stringify(profil);
    } catch (e) {
      console.error(e);
    }
  }

  @Mutation(() => String)
  async logIn(
    @Arg('data') userLogInData: LoginUserInput,
    @Ctx() { res }: { res: Response }
  ) {
    try {
      if (!process.env.JWT_SECRET) throw new Error('Missing env variable');

      const user = await User.findOneByOrFail({ email: userLogInData.email });
      const isValid = await argon.verify(
        user.hashedPassword,
        userLogInData.hashedPassword
      );
      const access_token = verifyToken(user, process.env.JWT_SECRET);
      setTokenInCookie(res, access_token);

      if (!isValid) throw new Error('Wrong password');

      const profil = getProfil(user);

      return JSON.stringify(profil);
    } catch (e) {
      console.error(e);
    }
  }
}
