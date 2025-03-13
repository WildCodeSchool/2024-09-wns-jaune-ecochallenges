import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';
import { UserActionChallenge } from './UserActionChallenge';

@Entity()
@ObjectType()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  status?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Field({ nullable: false })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  reviewedAt!: Date;

  @BeforeInsert()
  updateDates() {
    this.reviewedAt = new Date();
  }

  @Field((_type) => User)
  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  @Field((_type) => UserActionChallenge)
  @ManyToOne(
    () => UserActionChallenge,
    (userActionChallenge) => userActionChallenge.reviews,
    { onDelete: 'CASCADE' }
  )
  userActionChallenge!: UserActionChallenge;
}
