import {
  OneToMany,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Challenge } from './Challenge';
import argon2 from 'argon2';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  @Field()
  @Column({ length: 100 })
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ nullable: false })
  hashedPassword!: string;

  @Field(() => [Challenge])
  @OneToMany(() => Challenge, (challenge) => challenge.user)
  challenges!: Challenge[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    console.log('hashing password....');
    this.hashedPassword = await argon2.hash(this.hashedPassword);
    console.log('hashedPassword', this.hashedPassword);
  }
}
