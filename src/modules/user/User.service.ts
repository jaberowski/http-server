import { HttpError } from "../../utility/http-error";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UserRepository } from "./user.repository";

export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }

  async login({ username, password }: LoginUserDto) {
    const user = await this.userRepo.findByUsername(username);

    if (user === null) {
      throw new HttpError(400, "user not found");
    }

    if (user.password !== password) {
      throw new HttpError(401, "Invalid username or password");
    }

    return user;
  }

  async loginById(userId: string) {
    return this.userRepo.findById(userId);
  }
}
