import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { ActionLevel } from './ActionLevel';
import { User } from './User';
import { Challenge } from './Challenge';
import { Review } from './Review';

@Entity()
@ObjectType()
export class UserActionChallenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 50, nullable: true })
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

  @Field((_type) => Review)
  @OneToMany(() => Review, (review) => review.userActionChallenge, {
    cascade: true,
  })
  reviews!: Review[];
}
