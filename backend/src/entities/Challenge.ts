import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Action, User } from '@/entities';

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: string;

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

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.participatedChallenges)
  @JoinTable()
  members?: User[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdChallenges)
  owner?: User;
}
