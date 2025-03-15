import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Action } from './Action';
import { UserAction } from './UserAction';

@Entity()
@ObjectType()
export class ActionLevel extends BaseEntity {
  @Field()
  @Column()
  level!: number;

  @Field()
  @Column()
  points!: number;

  @Field()
  @Column({ type: 'text' })
  description?: string;

  @Field(() => Action)
  @ManyToOne(() => Action, (action) => action.actionLevels)
  action!: Action;

  @Field(() => [UserAction])
  @OneToMany(() => UserAction, (userAction) => userAction.actionLevel)
  userActions?: UserAction[];
}
