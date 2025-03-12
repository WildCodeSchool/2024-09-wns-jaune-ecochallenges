import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Challenge } from './Challenge';
import { Action } from './Action';

@Entity()
@ObjectType()
export class ActionChallenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field((_type) => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.actionsChallenges)
  challenge!: Challenge;

  @Field((_type) => Action)
  @ManyToOne(() => Action, (action) => action.actionsChallenges)
  action!: Action;
}
