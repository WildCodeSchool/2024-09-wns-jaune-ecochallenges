import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Challenge } from './Challenge';
import { User } from './User';

@Entity()
@ObjectType()
export class ChallengeUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  id!: number;

  @Field((_type) => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.challengesUsers)
  challenge!: Challenge;

  @Field((_type) => User)
  @ManyToOne(() => User, (user) => user.challengesUsers)
  user!: User;
}
