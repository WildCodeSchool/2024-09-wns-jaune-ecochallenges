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
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 100, nullable: false })
  @Index()
  label!: string;

  @Field((_type) => [Action], { nullable: true })
  @ManyToMany((_type) => Action, (action) => action.tags)
  actions?: Action[];
}
