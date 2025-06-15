import { Field, ID, InputType, Mutation, Query, Resolver } from 'type-graphql';
import {
  Action,
  Challenge,
  StatusEnum,
  User,
  UserActionChallenge,
} from '@/entities';
import { Arg } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { QueryFailedError } from 'typeorm';

@InputType()
export class UserActionChallengeInput {
  @Field(() => ID)
  userId!: string;

  @Field(() => ID)
  actionId!: string;

  @Field(() => ID)
  challengeId!: string;

  @Field()
  status!: StatusEnum;

  @Field(() => String, { nullable: true })
  comment!: string;
}

@Resolver(UserActionChallenge)
export class UserActionChallengeResolver {
  /**
   * Retrieves a single UserActionChallenge by user ID.
   *
   * This query attempts to find a UserActionChallenge where the `userId` matches the given `id`.
   * It throws an error if no matching entry is found.
   *
   * Note: If you're intending to fetch by a composite key (userId + actionId + challengeId),
   * you should update this query accordingly.
   *
   * @param {string} id - The ID of the user whose action challenge is to be fetched.
   * @returns {Promise<UserActionChallenge>} The matching UserActionChallenge entity.
   * @throws {GraphQLError} If no UserActionChallenge is found with the given ID.
   */
  @Query(() => UserActionChallenge)
  async getUserActionChallengeByUser(
    @Arg('id') id: string
  ): Promise<UserActionChallenge> {
    const userActionChallenge = await UserActionChallenge.findOneOrFail({
      where: { userId: id },
    });
    if (!userActionChallenge) {
      throw new GraphQLError('User action challenge not found');
    }
    return userActionChallenge;
  }

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
   * @returns {Promise<UserActionChallenge[]>} The matching UserActionChallenge entity.
   * @throws {GraphQLError} If no UserActionChallenge is found with the given ID.
   */
  @Query(() => [UserActionChallenge])
  async getUserActionChallengeByChallenge(
    @Arg('id') id: string
  ): Promise<UserActionChallenge[]> {
    const userActionChallenge = await UserActionChallenge.find({
      where: { challengeId: id },
      relations: ['user', 'action', 'challenge'],
    });
    if (!userActionChallenge || userActionChallenge.length === 0) {
      throw new GraphQLError('User action challenge not found');
    }
    return userActionChallenge;
  }

  /**
   * Retrieves all UserActionChallenge entries from the database.
   *
   * This query fetches all entries along with their related `user`, `action`, and `challenge` entities.
   * Throws an error if no entries are found (though this case is rare, as `find()` returns an empty array).
   *
   * @returns {Promise<UserActionChallenge[]>} An array of all UserActionChallenge entities with their relations.
   * @throws {GraphQLError} If the retrieval fails or no entries are found.
   */
  @Query(() => [UserActionChallenge])
  async getUserActionChallenges(): Promise<UserActionChallenge[]> {
    const userActionChallenges = await UserActionChallenge.find({
      relations: ['user', 'action', 'challenge'],
    });
    if (!userActionChallenges) {
      throw new GraphQLError('User action challenges not found');
    }
    return userActionChallenges;
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
   * @param {UserActionChallengeInput} data - The input object containing userId, actionId, challengeId, status, and optional comment.
   * @returns {Promise<UserActionChallenge>} The newly created UserActionChallenge entity including related user, action, and challenge.
   * @throws {GraphQLError} If required fields are missing, if a referenced entity is not found, or if the insert violates database constraints.
   */
  @Mutation(() => UserActionChallenge)
  async createUserActionChallenge(
    @Arg('data') data: UserActionChallengeInput
  ): Promise<UserActionChallenge> {
    try {
      if (!data.userId || !data.actionId || !data.challengeId) {
        throw new GraphQLError(
          'Missing required fields: user, action, or challenge'
        );
      }

      const newEntry = new UserActionChallenge();

      newEntry.user = await User.findOneOrFail({
        where: { id: data.userId },
      });
      newEntry.action = await Action.findOneOrFail({
        where: { id: data.actionId },
      });
      newEntry.challenge = await Challenge.findOneOrFail({
        where: { id: data.challengeId },
      });
      newEntry.status = data.status;
      newEntry.comment = data.comment || '';

      const savedEntry = await newEntry.save();

      const result = await UserActionChallenge.findOneOrFail({
        where: {
          userId: savedEntry.userId,
          actionId: savedEntry.actionId,
          challengeId: savedEntry.challengeId,
        },
        relations: ['user', 'action', 'challenge'],
      });

      return result;
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
   * @returns {Promise<UserActionChallenge>} The updated UserActionChallenge entity.
   * @throws {GraphQLError} If the entity is not found or a database error occurs.
   */
  @Mutation(() => UserActionChallenge)
  async updateUserActionChallenge(
    @Arg('data') data: UserActionChallengeInput
  ): Promise<UserActionChallenge> {
    try {
      let userActionChallenge = await UserActionChallenge.findOneOrFail({
        where: {
          userId: data.userId,
          actionId: data.actionId,
          challengeId: data.challengeId,
        },
        relations: ['user', 'action', 'challenge'],
      });

      userActionChallenge = Object.assign(userActionChallenge, {
        status: data.status,
        comment: data.comment,
      });

      await userActionChallenge.save();
      return userActionChallenge;
    } catch (error) {
      throw new GraphQLError(`An error occurred:${error}`);
    }
  }
}
