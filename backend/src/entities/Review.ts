import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { User } from './User';
import { UserAction } from './UserAction';
import { ReviewStatus } from '../enums/ReviewStatus.enum';
import { IsEnum, ValidateIf } from 'class-validator';

@Entity()
@ObjectType()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field(() => ReviewStatus)
  @Column({
    type: 'enum',
    enum: ReviewStatus,
  })
  @IsEnum(ReviewStatus)
  @ValidateIf((review) => review.status !== ReviewStatus.Pending, {
    message: 'Review status cannot be pending',
  })
  status!: ReviewStatus;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Field()
  @CreateDateColumn()
  reviewedAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  @Field(() => UserAction)
  @ManyToOne(() => UserAction, (UserAction) => UserAction.reviews, {
    onDelete: 'CASCADE',
  })
  userAction!: UserAction;
}
