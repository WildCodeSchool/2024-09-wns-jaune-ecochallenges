import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Tag, Challenge, UserActionChallenge } from '@/entities';

const levelType = {
  levelOne: 1,
  levelTwo: 2,
  levelThree: 3,
};

const iconType = ['leaf', 'recycling', 'drop'];

@Entity()
@ObjectType()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Field()
  @Column({ length: 100 })
  name!: string;

  @Field()
  @Column({ nullable: false, length: 300 })
  description!: string;

  @Field()
  @Column({ nullable: false, default: false })
  requires_view!: boolean;

  @Field()
  @Column({ nullable: false, default: levelType.levelOne })
  level!: number;

  @Field()
  @Column({ nullable: false, default: iconType[1] })
  icon!: string;

  @Field()
  @Column({ nullable: true })
  time!: number;

  @Field()
  @Column({ nullable: false })
  createdAt!: Date;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.actions)
  @JoinTable()
  tags?: Tag[];

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }

  @Field(() => [Challenge])
  @ManyToMany(() => Challenge, (challenge) => challenge.actions)
  challenges?: Challenge[];

  @Field(() => [UserActionChallenge])
  @OneToMany(
    () => UserActionChallenge,
    (userActionChallenge) => userActionChallenge.action
  )
  userActionChallenges?: UserActionChallenge[];
}
