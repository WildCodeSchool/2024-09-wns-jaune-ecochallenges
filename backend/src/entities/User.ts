import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Review } from './Review';
import { Challenge } from './Challenge';
import { UserAction } from './UserAction';

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Defines the roles and permissions level of a user',
});

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field()
  @Column({ length: 100 })
  firstName!: string;

  @Field()
  @Column({ length: 100 })
  lastName!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  hashedPassword!: string;

  @Field()
  @Column({ default: 0 })
  xp!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => [UserRole])
  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.User],
  })
  roles!: UserRole[];

  @Field(() => [Challenge])
  @ManyToMany(() => Challenge, (challenge) => challenge.users)
  @JoinTable()
  challenges?: Challenge[];

  @Field(() => [UserAction])
  @OneToMany(() => UserAction, (userAction) => userAction.user)
  userActions?: UserAction[];

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers?: User[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.followers)
  following?: User[];
}
