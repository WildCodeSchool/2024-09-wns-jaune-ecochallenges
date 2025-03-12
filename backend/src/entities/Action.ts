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
  @Column({ length: 500 })
  description?: string;

  @Field((_type) => [Tag], { nullable: false })
  @ManyToMany((_type) => Tag, (tag) => tag.actions)
  @JoinTable()
  tags!: Tag[];

  @Field((_type) => ActionLevel)
  @OneToMany(() => ActionLevel, (actionLevel) => actionLevel.action)
  actionLevels!: ActionLevel[];
}
