import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field()
  @Column({ length: 100, nullable: false })
  label!: string;

  @Field()
  @Column({ length: 500, nullable: true })
  description?: string;

  @Field()
  @Column({ nullable: false })
  date_start!: Date;

  @Field()
  @Column({ nullable: false })
  date_end!: Date;
}
