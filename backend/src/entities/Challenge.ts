import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: string;

  @Field()
  @Column({ length: 100 })
  name!: string;

  @Field()
  @Column({ length: 100 })
  description!: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.challenges, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user?: User;
}
