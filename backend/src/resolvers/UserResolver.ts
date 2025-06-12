import { GraphQLError } from 'graphql';
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
import { log } from 'console';

type Test = {
  id: any;
  firstname: any;
  lastname: any;
  description: any;
};

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

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  email!: string;

  @Field()
  hashedPassword!: string;
}

@InputType()
class UpdateUserInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  avatarUrl?: string;
}

const getProfil = (user: User) => {
  const profile = {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    description: user.description,
  };

  return profile;
};

const verifyToken = (user: User, jwtSecret: string): string => {
  const tokenContent = {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
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

  @Query(() => User)
  async getCurrentUser(@Ctx() { user }: { user: User }) {
    const currentUser = await User.findOne({
      where: { id: user.id },
      relations: ['participatedChallenges'],
    });
    if (!currentUser) throw new Error('Utilisateur non trouvé');
    return currentUser;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('user') userData: UpdateUserInput,
    @Ctx() { user }: { user: User }
  ) {
    console.log('userData', userData);
    console.log('user', user);

    if (user.id !== userData.id) {
      throw new GraphQLError(
        "Vous ne pouvez pas éditer le profile d'un autre utilisateur"
      );
    }

    const userToUpdate = await User.findOneByOrFail({ id: userData.id });

    userToUpdate.firstname = userData.firstname ?? userToUpdate.firstname;
    userToUpdate.lastname = userData.lastname ?? userToUpdate.lastname;
    userToUpdate.description = userData.description ?? userToUpdate.description;
    userToUpdate.avatarUrl = userData.avatarUrl ?? userToUpdate.avatarUrl;

    const updatedUser = await User.save(userToUpdate);

    return updatedUser;
  }

  @Mutation(() => String)
  async signUp(
    @Arg('data') userInfos: SignUpUserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.JWT_SECRET) {
      throw new GraphQLError('Missing JWT_SECRET environment variable');
    }

    try {
      const existingUser = await User.findOne({
        where: { email: userInfos.email },
      });
      if (existingUser) {
        throw new GraphQLError('Un compte avec cet email existe déjà');
      }

      const hashedPassword = await argon.hash(userInfos.hashedPassword);

      const user = await User.save({
        email: userInfos.email,
        hashedPassword: hashedPassword,
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        description: userInfos.description || '',
      });

      const access_token = verifyToken(user, process.env.JWT_SECRET);
      setTokenInCookie(res, access_token);

      const profil = getProfil(user);
      return JSON.stringify(profil);
    } catch (e) {
      if (e instanceof GraphQLError) throw e;
      throw new GraphQLError("Échec de l'inscription. Veuillez réessayer.");
    }
  }

  @Mutation(() => String)
  async logIn(
    @Arg('data') userLogInData: LoginUserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.JWT_SECRET) {
      throw new GraphQLError('Missing JWT_SECRET environment variable');
    }

    try {
      console.log(userLogInData);

      const user = await User.findOneByOrFail({ email: userLogInData.email });
      console.log(user);

      const isValid = await argon.verify(
        user.hashedPassword,
        userLogInData.hashedPassword
      );

      if (!isValid) {
        throw new GraphQLError('Email ou mot de passe incorrect');
      }

      const access_token = verifyToken(user, process.env.JWT_SECRET);
      setTokenInCookie(res, access_token);

      const profil = getProfil(user);
      return JSON.stringify(profil);
    } catch (e) {
      if (e instanceof GraphQLError) throw e;
      throw new GraphQLError(
        'Échec de la connexion. Vérifiez vos identifiants.'
      );
    }
  }

  @Mutation(() => Boolean)
  async logOut(@Ctx() { res }: { res: Response }) {
    try {
      res.clearCookie('access_token');
      return true;
    } catch (e) {
      if (e instanceof GraphQLError) throw e;
      throw new GraphQLError('Erreur lors de la déconnexion.');
    }
  }
}
