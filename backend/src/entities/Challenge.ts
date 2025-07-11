import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Action, User, UserActionChallengeScore } from '@/entities';
import { Score } from './Score';

export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Field()
  @Column({ length: 100 })
  label!: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column('varchar', {
    length: 255,
    default: './banners/banner-1.jpg',
  })
  bannerUrl?: string;

  @Field()
  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Field()
  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Field(() => Status)
  get status(): Status {
    const now = new Date();
    return now < this.endDate ? Status.IN_PROGRESS : Status.COMPLETED;
  }

  @Field()
  @Column({ type: 'boolean', default: true })
  isPublic!: boolean;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => [Action])
  @ManyToMany(() => Action, (action) => action.challenges)
  @JoinTable()
  actions?: Action[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.participatedChallenges)
  @JoinTable()
  members?: User[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdChallenges)
  owner?: User;

  @Field(() => Score)
  @OneToMany(() => Score, (score) => score.challenge)
  score?: Score;

  @Field(() => [UserActionChallengeScore])
  @OneToMany(
    () => UserActionChallengeScore,
    (userActionChallengeScore) => userActionChallengeScore.challenge
  )
  userActionChallengeScores?: UserActionChallengeScore[];
}
