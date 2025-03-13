import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Role } from './Role';
import { ChallengeUser } from './ChallengeUser';
import { UserActionChallenge } from './UserActionChallenge';
import { Review } from './Review';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field({ nullable: false })
  @Column({ length: 100, nullable: false })
  first_name!: string;

  @Field({ nullable: false })
  @Column({ length: 100, nullable: false })
  last_name!: string;

  @Field({ nullable: false })
  @Column({ unique: true, nullable: false })
  email!: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  hashedPassword!: string;

  @Field({ nullable: false })
  @Column({ default: 0, nullable: false })
  xp!: number;

  @Field({ nullable: false })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt!: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateDates() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    this.updatedAt = new Date();
  }

  @Field((_type) => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;

  @Field((_type) => [ChallengeUser])
  @OneToMany(() => ChallengeUser, (challengeUser) => challengeUser.user)
  challengesUsers!: ChallengeUser[];

  @Field((_type) => [UserActionChallenge])
  @OneToMany(
    () => UserActionChallenge,
    (userActionChallenge) => userActionChallenge.user
  )
  userActionChallenges!: UserActionChallenge[];

  @Field((_type) => [Review])
  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @Field((_type) => [User], { nullable: true })
  @ManyToMany((_type) => User, (user) => user.friendsWithMe)
  @JoinTable()
  friends?: User[];

  @ManyToMany(() => User, (user) => user.friends)
  friendsWithMe?: User[];
}
