import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Action, User, UserActionChallengeScore } from '@/entities';

export enum ChallengeStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

registerEnumType(ChallengeStatusEnum, {
  name: 'ChallengeStatus',
  description: 'The status of a challenge',
});

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Field()
  @Column({ length: 100 })
  label!: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column('varchar', {
    length: 255,
    default: '/banners/banner-1.jpg',
  })
  bannerUrl?: string;

  @Field()
  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Field()
  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Field(() => ChallengeStatusEnum)
  @Column({
    type: 'enum',
    enum: ChallengeStatusEnum,
  })
  status!: ChallengeStatusEnum;

  @BeforeInsert()
  setStatus() {
    this.status =
      new Date() < this.endDate
        ? ChallengeStatusEnum.IN_PROGRESS
        : ChallengeStatusEnum.COMPLETED;
  }

  @Field()
  @Column({ type: 'boolean', default: true })
  isPublic!: boolean;

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

  @Field(() => [UserActionChallengeScore])
  @OneToMany(
    () => UserActionChallengeScore,
    (userActionChallengeScore) => userActionChallengeScore.challenge
  )
  userActionChallengeScores?: UserActionChallengeScore[];

  @Field(() => [String])
  @Column({ type: 'jsonb', default: [] })
  invites!: string[];
}
