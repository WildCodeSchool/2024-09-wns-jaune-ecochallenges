import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Role } from './Role';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 100 })
  first_name!: string;

  @Field()
  @Column({ length: 100 })
  last_name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ nullable: false })
  hashedPassword!: string;

  @Field()
  @Column({ default: 0 })
  xp!: number;

  @Field()
  @Column({ nullable: false })
  createdAt!: Date;

  @Field()
  @Column({ nullable: true })
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
}
