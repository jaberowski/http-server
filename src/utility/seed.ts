import { v4 } from "uuid";
import { AppDataSource } from "./data-source";
import { UserEntity } from "../modules/user/entity/user.entity";

export const seedUser = async () => {
  const userRepo = AppDataSource.getRepository(UserEntity);

  const count = await userRepo.count();

  if (count === 0) {
    userRepo.save([
      { id: v4(), username: "admin", password: "admin", role: "Admin" },
      { id: v4(), username: "rep", password: "rep", role: "Representative" },
    ]);
  }
};
