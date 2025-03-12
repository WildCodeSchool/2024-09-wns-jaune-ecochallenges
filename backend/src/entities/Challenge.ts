import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { ActionChallenge } from './ActionChallenge';

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 100, nullable: false })
  label!: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field()
  @Column({ nullable: false })
  date_start!: Date;

  @Field()
  @Column({ nullable: false })
  date_end!: Date;

  @Field((_type) => ActionChallenge)
  @OneToMany(
    () => ActionChallenge,
    (actionChallenge) => actionChallenge.challenge
  )
  actionsChallenges!: ActionChallenge[];
}
