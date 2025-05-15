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
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  description?: string;
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

  @Mutation(() => String)
  async signUp(
    @Arg('data') userSignUpData: SignUpUserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.JWT_SECRET) {
      throw new GraphQLError('Missing JWT_SECRET environment variable');
    }

    try {
      const existingUser = await User.findOne({
        where: { email: userSignUpData.email },
      });
      if (existingUser) {
        throw new GraphQLError('Un compte avec cet email existe déjà');
      }

      const hashedPassword = await argon.hash(userSignUpData.hashedPassword);

      const user = await User.save({
        email: userSignUpData.email,
        hashedPassword: hashedPassword,
        firstname: userSignUpData.firstname,
        lastname: userSignUpData.lastname,
        description: userSignUpData.description || '',
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
      const user = await User.findOneByOrFail({ email: userLogInData.email });

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
  @Mutation(() => User)
  async updateUser(
    @Arg('id') id: string,
    @Arg('data') data: UpdateUserInput
  ): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new GraphQLError('Utilisateur introuvable');
    }

    // Mise à jour des champs autorisés
    if (data.firstname !== undefined) user.firstname = data.firstname;
    if (data.lastname !== undefined) user.lastname = data.lastname;
    if (data.description !== undefined) user.description = data.description;

    await user.save();
    return user;
  }
}
