import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';
import { Challenge } from './Challenge';

@Entity()
@ObjectType()
@Unique(['user', 'challenge'])
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Field()
  @Column({ nullable: false })
  result!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.score)
  user?: User;

  @Field(() => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.score)
  challenge?: Challenge;
}
