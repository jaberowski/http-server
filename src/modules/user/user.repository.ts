import { User } from "./model/user";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { seedUser } from "../../utility/seed";
import { UserId } from "./model/user-id";

export class UserRepository {
  private userRepo: Repository<UserEntity>;
  constructor(appDataSource: DataSource) {
    this.userRepo = appDataSource.getRepository(UserEntity);
    seedUser();
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }

  public findById(userId: UserId) {
    return this.userRepo.findOneBy({ id: userId });
  }
}
