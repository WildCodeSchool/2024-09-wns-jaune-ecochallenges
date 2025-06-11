import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Challenge, Tag, User, UserActionChallenge } from '@/entities';
import { ChallengeActionScore } from './ChallengeActionScore';

const levelType = {
  levelOne: 1,
  levelTwo: 2,
  levelThree: 3,
};

const iconType = ['leaf', 'recycling', 'drop'];

@Entity()
@ObjectType()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Field()
  @Column({ length: 100 })
  name!: string;

  @Field()
  @Column({ nullable: false, length: 300 })
  description!: string;

  @Field()
  @Column({ nullable: false, default: false })
  requires_view!: boolean;

  @Field()
  @Column({ nullable: false, default: levelType.levelOne })
  level!: number;

  @Field()
  @Column({ nullable: false, default: iconType[1] })
  icon!: string;

  @Field()
  @Column({ nullable: true })
  time!: number;

  @Field()
  @Column({ nullable: true })
  points!: number;

  @Field()
  @Column({ nullable: false })
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdActions)
  createdBy!: User;

  @Field(() => [Challenge])
  @ManyToMany(() => Challenge, (challenge) => challenge.actions)
  challenges?: Challenge[];

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.actions)
  @JoinTable()
  tags?: Tag[];

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  insertPoints() {
    this.points = this.level * 4 + this.time * 2;
  }

  @Field(() => [ChallengeActionScore])
  @OneToMany(
    () => ChallengeActionScore,
    (challengeActionScore) => challengeActionScore.action
  )
  challengeActionScores?: ChallengeActionScore[];

  @Field(() => [UserActionChallenge])
  @OneToMany(
    () => UserActionChallenge,
    (userActionChallenge) => userActionChallenge.action
  )
  userActionChallenges?: UserActionChallenge[];
}
