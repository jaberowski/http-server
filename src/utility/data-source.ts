import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../modules/user/entity/user.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "26a1998jF@",
  database: "porsi",
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: [],
  subscribers: [],
});
