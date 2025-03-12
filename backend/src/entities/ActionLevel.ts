import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Action } from './Action';

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
}
