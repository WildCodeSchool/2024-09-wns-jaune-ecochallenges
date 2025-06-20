import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import argon2 from 'argon2';
import { Challenge, Action } from '@/entities';
import { Score } from './Score';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  @Field()
  @Column({ length: 100 })
  firstname!: string;

  @Field()
  @Column({ length: 100 })
  lastname!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @Column({ nullable: false })
  hashedPassword!: string;

  @Field(() => [Action])
  @OneToMany(() => Action, (action) => action.createdBy)
  createdActions?: Action[];

  @Field()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Field(() => [Challenge])
  @ManyToMany(() => Challenge, (challenge) => challenge.members)
  participatedChallenges?: Challenge[];

  @Field(() => [Challenge])
  @OneToMany(() => Challenge, (challenge) => challenge.owner)
  createdChallenges?: Challenge[];

  @Field(() => Score)
  @OneToMany(() => Score, (score) => score.user)
  score?: Score;

  @Field()
  @Column({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 255 })
  avatarUrl?: string;

  @BeforeInsert()
  async hashPassword() {
    this.hashedPassword = await argon2.hash(this.hashedPassword);
  }
}
