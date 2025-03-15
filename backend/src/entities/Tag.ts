import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Action } from './Action';

@Entity()
@ObjectType()
@Unique(['label'])
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field()
  @Column({ length: 100 })
  @Index()
  label!: string;

  @Field(() => [Action], { nullable: true })
  @ManyToMany(() => Action, (action) => action.tags)
  actions?: Action[];
}
