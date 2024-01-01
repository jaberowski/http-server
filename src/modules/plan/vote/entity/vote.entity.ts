import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { VoteId } from "../model.ts/vote-id";
import { UserId } from "../../../user/model/user-id";
import { ProgramId } from "../../program/model/program-id";
import { PlanId } from "../../model/plan-id";
import { UserEntity } from "../../../user/entity/user.entity";
import { PlanEntity } from "../../enitty/plan.entity";
import { ProgramEntity } from "../../program/entity/program.entity";

@Entity("votes")
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id!: VoteId;

  @Column()
  userId!: UserId;

  @ManyToOne(() => UserEntity)
  user?: UserEntity;

  @Column()
  programId!: ProgramId;

  @ManyToOne(() => ProgramEntity)
  program?: ProgramEntity;

  @Column()
  planId!: PlanId;

  @ManyToOne(() => PlanEntity)
  plan?: PlanEntity;

  @Column()
  date!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
