import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { User } from './User';
import { Action } from './Action';
import { Challenge } from './Challenge';

export enum StatusEnum {
  COMPLETED = 'completed',
  PENDING = 'pending',
  NOT_STARTED = 'not_started',
  REJECTED = 'rejected',
}

@Entity()
@ObjectType()
@Unique(['validatedForId', 'actionId', 'challengeId'])
export class UserActionChallengeScore extends BaseEntity {
  //validatedById is the user or admin or owner of challenge who validated the action
  @Column({ nullable: true })
  validatedById!: string;

  //validatedForId is the user belongs this action validated by the user himself or admin or owner of challenge
  @PrimaryColumn()
  validatedForId!: string;

  @PrimaryColumn()
  actionId!: string;

  @PrimaryColumn()
  challengeId!: string;

  @Field({ nullable: false })
  @Column({ type: 'boolean' })
  isValidated!: boolean;

  @Field({ nullable: false })
  @Column({ type: 'int', default: 0 })
  points!: number;

  @Field()
  @Column({ nullable: false, default: StatusEnum.NOT_STARTED })
  status!: StatusEnum;

  @Field()
  @Column({ nullable: true })
  comment!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updatedAt!: Date;

  // validatedBy is the user or admin or owner of challenge who validated the action
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.validatedActions)
  @JoinColumn({ name: 'validatedById' })
  validatedBy?: User;

  // validatedFor is the user that belongs this action validated by the user himself or admin or owner of challenge
  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.belongsOwned)
  @JoinColumn({ name: 'validatedForId' })
  validatedFor!: User;

  @Field(() => Action, { nullable: false })
  @ManyToOne(() => Action, (action) => action.userActionChallengeScores)
  @JoinColumn({ name: 'actionId' })
  action!: Action;

  @Field(() => Challenge, { nullable: false })
  @JoinColumn({ name: 'challengeId' })
  @ManyToOne(
    () => Challenge,
    (challenge) => challenge.userActionChallengeScores
  )
  challenge!: Challenge;
}
