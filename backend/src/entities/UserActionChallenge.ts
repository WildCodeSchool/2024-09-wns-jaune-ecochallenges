import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { ActionLevel } from './ActionLevel';
import { User } from './User';
import { Challenge } from './Challenge';

@Entity()
@ObjectType()
export class UserActionChallenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 50 })
  status?: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  proofPic?: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  post?: string;

  @Field()
  @Column({ nullable: false })
  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }
  createdAt!: Date;

  @Field((_type) => User)
  @ManyToOne(() => User, (user) => user.userActionChallenges)
  user!: User;

  @Field((_type) => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.userActionChallenges)
  challenge!: Challenge;

  @Field((_type) => ActionLevel)
  @ManyToOne(
    () => ActionLevel,
    (actionLevel) => actionLevel.userActionChallenges
  )
  actionLevel!: ActionLevel;
}
