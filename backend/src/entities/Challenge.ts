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
import { UserAction } from './UserAction';
import { Action } from './Action';
import { User } from './User';

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field()
  @Column({ length: 100 })
  label!: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field()
  @Column()
  dateStart!: Date;

  @Field()
  @Column()
  dateEnd!: Date;

  @Field(() => [Action])
  @ManyToMany(() => Action, (action) => action.challenges)
  @JoinTable()
  actions?: Action[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.challenges)
  @JoinTable()
  users?: User[];

  @Field(() => [UserAction])
  @OneToMany(() => UserAction, (userAction) => userAction.challenge)
  userActions?: UserAction[];
}
