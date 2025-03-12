import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Action } from './Action';
import { UserActionChallenge } from './UserActionChallenge';

@Entity()
@ObjectType()
export class ActionLevel extends BaseEntity {
  @Field()
  @Column({ nullable: false })
  level!: number;

  @Field()
  @Column({ nullable: false })
  points!: number;

  @Field()
  @Column({ type: 'text' })
  description?: string;

  @Field((_type) => Action)
  @ManyToOne(() => Action, (action) => action.actionLevels)
  action!: Action;

  @Field((_type) => UserActionChallenge)
  @OneToMany(
    () => UserActionChallenge,
    (userActionChallenge) => userActionChallenge.actionLevel
  )
  userActionChallenges!: UserActionChallenge[];
}
