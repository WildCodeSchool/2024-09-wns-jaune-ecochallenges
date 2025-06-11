import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
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
@Unique(['userId', 'actionId', 'challengeId'])
export class UserActionChallenge extends BaseEntity {
  @PrimaryColumn()
  userId!: string;

  @PrimaryColumn()
  actionId!: string;

  @PrimaryColumn()
  challengeId!: string;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Field(() => Action)
  @ManyToOne(() => Action)
  action!: Action;

  @Field(() => Challenge)
  @ManyToOne(() => Challenge)
  challenge!: Challenge;

  @Field()
  @Column({ nullable: false, default: StatusEnum.NOT_STARTED })
  status!: StatusEnum;

  @Field()
  @Column({ nullable: true })
  comment!: string;
}
