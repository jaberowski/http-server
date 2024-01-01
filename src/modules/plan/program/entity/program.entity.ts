import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PlanEntity } from "../../enitty/plan.entity";
import { UserEntity } from "../../../user/entity/user.entity";
import { NonEmptyString } from "../../../../data/non-empty-string";
import { ProgramId } from "../model/program-id";
import { PlanId } from "../../model/plan-id";
import { UserId } from "../../../user/model/user-id";
import { WholeNumber } from "../../../../data/int";

@Entity("programs")
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id!: ProgramId;

  @Column()
  title!: NonEmptyString;

  @Column()
  description!: string;

  @Column({ default: 0 })
  votedCount!: WholeNumber;

  @Column()
  planId!: PlanId;

  @ManyToOne(() => PlanEntity)
  plan!: PlanEntity;

  @Column()
  userId!: UserId;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
