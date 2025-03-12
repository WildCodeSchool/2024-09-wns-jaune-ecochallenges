import { BaseEntity, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Challenge } from './Challenge';
import { Action } from './Action';

@Entity()
@ObjectType()
export class ActionChallenge extends BaseEntity {
  @Field((_type) => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.actionsChallenges)
  challenge!: Challenge;

  @Field((_type) => Action)
  @ManyToOne(() => Action, (action) => action.actionsChallenges)
  action!: Action;
}
