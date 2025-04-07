import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Action } from './Action';

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 100 })
  label!: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true, length: 255 })
  bannerUrl?: string;

  @Field()
  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Field()
  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => [Action])
  @ManyToMany(() => Action, (action) => action.challenges)
  @JoinTable()
  actions?: Action[];
}
