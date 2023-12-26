import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../modules/user/entity/user.entity";
import { PlanEntity } from "../modules/plan/enitty/plan.entity";
import { ProgramEntity } from "../modules/plan/program/entity/program.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "jaber",
  password: "26a1998jF@",
  database: "porsi",
  synchronize: true,
  logging: false,
  entities: [UserEntity, PlanEntity, ProgramEntity],
  migrations: [],
  subscribers: [],
});
