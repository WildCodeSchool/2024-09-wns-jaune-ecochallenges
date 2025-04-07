import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
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
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @Column({ nullable: false })
  hashedPassword!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.hashedPassword = await argon2.hash(this.hashedPassword);
  }
}
