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

@Entity("plans")
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

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
