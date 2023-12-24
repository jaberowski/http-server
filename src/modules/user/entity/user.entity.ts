import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../model/user";

@Entity("users")
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: UserRole;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
