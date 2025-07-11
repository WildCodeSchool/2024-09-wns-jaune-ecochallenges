import {
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import {
  Action,
  Challenge,
  UACStatusEnum,
  User,
  UserActionChallengeScore,
  UserRole,
} from '@/entities';
import { Arg } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { QueryFailedError } from 'typeorm';

@InputType()
export class UserActionChallengeScoreInput {
  @Field()
  status!: UACStatusEnum;

  @Field(() => String, { nullable: true })
  comment!: string;

  @Field(() => Boolean, { nullable: false })
  isValidated!: boolean;

  @Field(() => ID)
  actionId!: string;

  @Field(() => ID)
  challengeId!: string;

  @Field(() => ID)
  validatedFor!: string;
}

@InputType()
export class UserActionChallengeScoreUpdateInput {
  @Field()
  status!: UACStatusEnum;

  @Field(() => String, { nullable: true })
  comment!: string;

  @Field(() => ID)
  actionId!: string;

  @Field(() => ID)
  challengeId!: string;

  @Field(() => ID)
  validatedFor!: string;
}

@Resolver(UserActionChallengeScore)
export class UserActionChallengeScoreResolver {
  /**
   * Retrieves a single UserActionChallenge by challenge ID.
   *
   * This query attempts to find a UserActionChallenge where the `challengeId` matches the given `id`.
   * It throws an error if no matching entry is found.
   *
   * Note: If you're intending to fetch by a composite key (userId + actionId + challengeId),
   * you should update this query accordingly.
   *
   * @param {string} id - The ID of the challenge
   * @returns {Promise<UserActionChallengeScore[]>} The matching UserActionChallengeScore entity.
   * @throws {GraphQLError} If no UserActionChallengeScore is found with the given ID.
   */
  @Query(() => [UserActionChallengeScore])
  async getUserActionChallengeScoreByChallenge(
    @Arg('id') id: string
  ): Promise<UserActionChallengeScore[]> {
    const userActionChallengeScore = await UserActionChallengeScore.find({
      where: { challenge: { id } },
      relations: ['action', 'challenge', 'validatedBy', 'validatedFor'],
    });
    if (!userActionChallengeScore || userActionChallengeScore.length === 0) {
      throw new GraphQLError('User action challenge not found');
    }
    return userActionChallengeScore;
  }

  /**
   * Creates a new UserActionChallenge entry linking a user, action, and challenge.
   *
   * This mutation checks for the existence of the provided user, action, and challenge,
   * then creates a new entry with the given status and optional comment.
   * It returns the fully loaded UserActionChallenge entity with relations.
   *
   * Throws an error if any of the required IDs are missing or if a duplicate key constraint is violated.
   *
   * @param {UserActionChallengeScoreInput} data - The input object containing actionId, challengeId, status, and optional comment.
   * @param {Object} ctx - The GraphQL context object.
   * @param {User} ctx.user - The authenticated user from the context.
   * @returns {Promise<UserActionChallengeScore>} The newly created UserActionChallengeScore entity including related user, action, and challenge.
   * @throws {GraphQLError} If required fields are missing, if a referenced entity is not found, or if the insert violates database constraints.
   */
  @Mutation(() => UserActionChallengeScore)
  async createUserActionChallengeScore(
    @Arg('data') data: UserActionChallengeScoreInput,
    @Ctx() { user }: { user: User }
  ): Promise<UserActionChallengeScore> {
    try {
      if (!data.actionId || !data.challengeId || !user?.id) {
        throw new GraphQLError(
          'Enable to update user action challenge: missing required fields: user, action, or challenge'
        );
      }
      const challenge = await Challenge.findOneOrFail({
        where: { id: data.challengeId },
        relations: ['actions', 'members', 'owner'],
      });

      const actionList = challenge.actions?.map((action) => action.id);

      if (!actionList?.map(Number).includes(Number(data.actionId))) {
        throw new Error('Action non trouvée');
      }

      const action = await Action.findOneOrFail({
        where: { id: data.actionId },
      });

      // Check if the user exist
      const validatedUser = await User.findOneOrFail({
        where: { id: data.validatedFor },
      });
      const userActionChallengeScore = new UserActionChallengeScore();

      await this.validateUserPermissionsToValidateAllActions(
        user,
        challenge,
        data.validatedFor
      );

      userActionChallengeScore.validatedBy = undefined;
      userActionChallengeScore.validatedFor = validatedUser;
      userActionChallengeScore.validatedBy = user;
      userActionChallengeScore.action = action;
      userActionChallengeScore.challenge = challenge;
      userActionChallengeScore.status = data.status;
      userActionChallengeScore.comment = data.comment || '';
      userActionChallengeScore.points = action.points;
      userActionChallengeScore.isValidated = true;

      if (action.requires_view) {
        userActionChallengeScore.validatedBy = undefined;
        userActionChallengeScore.isValidated = true;
      }

      await userActionChallengeScore.save();
      return userActionChallengeScore;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new GraphQLError(`Database error: ${error.message}`);
      }
      throw new GraphQLError(
        `User action challenge not created: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Updates the status and comment of an existing UserActionChallenge.
   *
   * This mutation searches for a UserActionChallenge based on the composite key
   * (userId, actionId, challengeId), and updates its `status` and `comment` fields.
   * The primary keys are not allowed to be changed.
   *
   * @param {UserActionChallengeInput} data - The input data containing userId, actionId, challengeId, and the new values to update.
   * @param {Object} ctx - The GraphQL context object.
   * @param {User} ctx.user - The authenticated user from the context.
   * @returns {Promise<UserActionChallenge>} The updated UserActionChallenge entity.
   * @throws {GraphQLError} If the entity is not found or a database error occurs.
   */
  @Mutation(() => UserActionChallengeScore)
  async updateUserActionChallengeScore(
    @Arg('data') data: UserActionChallengeScoreUpdateInput,
    @Ctx() { user }: { user: User }
  ): Promise<UserActionChallengeScore> {
    try {
      if (!data.actionId || !data.challengeId || !user?.id) {
        throw new GraphQLError(
          'Missing required fields: user, action, or challenge'
        );
      }

      const userActionChallenge = await UserActionChallengeScore.findOneOrFail({
        where: {
          validatedFor: { id: data.validatedFor },
          action: { id: data.actionId },
          challenge: { id: data.challengeId },
        },
        relations: ['action', 'challenge', 'validatedFor'],
      });

      const challenge = await Challenge.findOneOrFail({
        where: { id: data.challengeId },
        relations: ['actions', 'members', 'owner'],
      });

      const action = await Action.findOneOrFail({
        where: { id: data.actionId },
      });

      await this.validateUserPermissionsToValidateAllActions(
        user,
        challenge,
        data.validatedFor
      );

      if (action.requires_view) {
        await this.validateUserPermissionsToValidateOnlyPendingActions(
          user,
          challenge,
          data.validatedFor
        );

        userActionChallenge.validatedBy = user;
        userActionChallenge.isValidated = true;
        userActionChallenge.status = data.status;
        userActionChallenge.comment = data.comment || '';
        await userActionChallenge.save();
        return userActionChallenge;
      }

      userActionChallenge.status = data.status;
      userActionChallenge.comment = data.comment || '';
      userActionChallenge.validatedBy = undefined;

      await userActionChallenge.save();
      return userActionChallenge;
    } catch (error) {
      throw new GraphQLError(`An error occurred:${error}`);
    }
  }

  private async validateUserPermissionsToValidateAllActions(
    user: User,
    challenge: Challenge,
    validatedForId: string
  ): Promise<void> {
    const memberIds = challenge.members?.map((member) => member.id) || [];
    const isValidatedForMember = memberIds.includes(validatedForId);
    const isUserOwner = challenge.owner?.id === user.id;
    const isUserAdmin = user.role === UserRole.ADMIN;
    const isUserMember = memberIds.includes(user.id);

    // User must be a member of the challenge
    if (!isValidatedForMember) {
      throw new GraphQLError(
        "L'utilisateur validé ne fait pas partie de ce challenge"
      );
    }

    // Only members, owners or admins can validate
    if (!isUserMember && !isUserOwner && !isUserAdmin) {
      throw new GraphQLError("Vous n'êtes pas autorisé à valider cette action");
    }
  }

  private async validateUserPermissionsToValidateOnlyPendingActions(
    user: User,
    challenge: Challenge,
    validatedForId: string
  ): Promise<void> {
    const memberIds = challenge.members?.map((member) => member.id) || [];
    const isValidatedForMember = memberIds.includes(validatedForId);
    const isUserOwner = challenge.owner?.id === user.id;
    const isUserAdmin = user.role === UserRole.ADMIN;

    // User must be a member of the challenge
    if (!isValidatedForMember) {
      throw new GraphQLError(
        "L'utilisateur validé ne fait pas partie de ce challenge"
      );
    }

    // Only members, owners or admins can validate
    if (!isUserOwner && !isUserAdmin) {
      throw new GraphQLError("Vous n'êtes pas autorisé à valider cette action");
    }
  }
}
