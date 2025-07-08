import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Action, Challenge, User } from '@/entities';

@Entity()
@ObjectType()
export class ChallengeActionScore extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Field({ nullable: false })
  @Column({ type: 'boolean' })
  isValidated!: boolean;

  @Field({ nullable: false })
  @Column({ type: 'int', default: 0 })
  points!: number;

  @Field(() => [Action])
  @ManyToOne(() => Action, (action) => action.challengeActionScores)
  action!: Action;

  @Field(() => [Challenge], { nullable: false })
  @ManyToOne(() => Challenge, (challenge) => challenge.challengeActionScores)
  challenge!: Challenge;

  @Field(() => [User], { nullable: false })
  @ManyToOne(() => User, (user) => user.challengeActionScores)
  validatedBy!: User;
}
