import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { ActionLevel } from './ActionLevel';
import { User } from './User';
import { Challenge } from './Challenge';
import { Review } from './Review';
import { ReviewStatus } from '../enums/ReviewStatus.enum';

@Entity()
@ObjectType()
export class UserAction extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field(() => ReviewStatus, { nullable: true })
  @Column({
    type: 'enum',
    enum: ReviewStatus,
    nullable: true,
  })
  status?: ReviewStatus;

  @Field()
  @Column({ default: false })
  requiresReview!: boolean;

  @Field()
  @Column({ type: 'text', nullable: true })
  proofPic?: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  post?: string;

  @Field(() => ActionLevel, { nullable: false })
  @ManyToOne(() => ActionLevel, (actionLevel) => actionLevel.userActions)
  @JoinColumn()
  actionLevel!: ActionLevel;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userActions)
  user!: User;

  @Field(() => Challenge, { nullable: true })
  @ManyToOne(() => Challenge, (challenge) => challenge.userActions)
  challenge?: Challenge;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.userAction)
  reviews?: Review[];
}
