import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../modules/user/entity/user.entity";
import { PlanEntity } from "../modules/plan/enitty/plan.entity";
import { ProgramEntity } from "../modules/plan/program/entity/program.entity";
import dotenv from "dotenv-flow";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_URL,
  synchronize: true,
  logging: false,
  entities: [UserEntity, PlanEntity, ProgramEntity],
  migrations: [],
  subscribers: [],
});
