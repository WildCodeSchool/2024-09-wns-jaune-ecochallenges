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
import { ActionChallenge } from './ActionChallenge';

@Entity()
@ObjectType()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 100 })
  label!: string;

  @Field()
  @Column({ type: 'text' })
  description?: string;

  @Field((_type) => [Tag], { nullable: false })
  @ManyToMany((_type) => Tag, (tag) => tag.actions)
  @JoinTable()
  tags!: Tag[];

  @Field((_type) => ActionLevel)
  @OneToMany(() => ActionLevel, (actionLevel) => actionLevel.action)
  actionLevels!: ActionLevel[];

  @Field((_type) => ActionChallenge)
  @OneToMany(() => ActionChallenge, (actionChallenge) => actionChallenge.action)
  actionsChallenges!: ActionChallenge[];
}
