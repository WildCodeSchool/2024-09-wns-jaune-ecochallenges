import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Action } from './Action';

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 100 })
  label!: string;

  @Field((_type) => [Action], { nullable: false })
  @ManyToMany((_type) => Action, (action) => action.tags)
  actions!: Action[];
}
