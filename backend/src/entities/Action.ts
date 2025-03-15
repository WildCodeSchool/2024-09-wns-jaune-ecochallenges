import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Tag } from './Tag';
import { ActionLevel } from './ActionLevel';
import { Challenge } from './Challenge';

@Entity()
@ObjectType()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field()
  @Column({ length: 100 })
  label!: string;

  @Field()
  @Column({ type: 'text' })
  description?: string;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.actions)
  @JoinTable()
  tags?: Tag[];

  @Field(() => ActionLevel)
  @OneToMany(() => ActionLevel, (actionLevel) => actionLevel.action)
  actionLevels!: ActionLevel[];

  @Field(() => [Challenge])
  @ManyToMany(() => Challenge, (challenge) => challenge.actions)
  challenges!: Challenge[];
}
