import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: string;

  @Field()
  @Column({ length: 100 })
  name!: string;

  @Field()
  @Column({ nullable: false, length: 250 })
  description!: string;

  @Field()
  @Column({ nullable: false, default: false })
  requires_view!: boolean;

  @Field()
  @Column({ nullable: false })
  createdAt!: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }
}
