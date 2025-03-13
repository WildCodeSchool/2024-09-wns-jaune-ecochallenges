import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';

@Entity()
@ObjectType()
@Unique(['label'])
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 100, nullable: false })
  @Index()
  label!: string;

  @Field((_type) => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}
