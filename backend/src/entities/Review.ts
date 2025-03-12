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
import { UserActionChallenge } from './UserActionChallenge';

@Entity()
@ObjectType()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 50, nullable: true })
  status?: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Field()
  @Column({ nullable: false })
  @BeforeInsert()
  updateDates() {
    this.reviewedAt = new Date();
  }
  reviewedAt!: Date;

  @Field((_type) => User)
  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  @Field((_type) => UserActionChallenge)
  @ManyToOne(
    () => UserActionChallenge,
    (userActionChallenge) => userActionChallenge.reviews
  )
  userActionChallenge!: UserActionChallenge;
}
