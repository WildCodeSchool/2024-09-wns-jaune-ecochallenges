import { ID, ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Action } from '@/entities';

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  icon!: string;

  @Field(() => [Action], { nullable: true })
  @ManyToMany(() => Action, (action) => action.tags)
  actions?: Action[];
}
