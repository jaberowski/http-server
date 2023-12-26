import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProgramEntity } from "../program/entity/program.entity";
import { UserEntity } from "../../user/entity/user.entity";
import { NonEmptyString } from "../../../data/non-empty-string";
import { PlanId } from "../model/plan-id";

@Entity("plans")
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id!: PlanId;

  @Column()
  title!: NonEmptyString;

  @Column()
  description!: string;

  @Column()
  deadLine!: Date;

  @OneToMany(() => ProgramEntity, (program) => program.plan, {
    cascade: ["insert"],
  })
  programs!: ProgramEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
