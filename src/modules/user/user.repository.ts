import { v4 } from "uuid";
import { HttpError } from "../../utility/http-error";
import { User } from "./model/user";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { AppDataSource } from "../../utility/data-source";

export class UserRepository {
  private userRepo: Repository<UserEntity>;
  constructor() {
    this.userRepo = AppDataSource.getRepository(UserEntity);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }

  public findById(userId: string) {
    return this.userRepo.findOneBy({ id: userId });
  }
}
