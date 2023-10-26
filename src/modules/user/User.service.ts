import { HttpError } from "../../utility/http-error";
import { UserRepository } from "./user.repository";

export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }

  loginUserByInfo(dto: { username: string; password: string }) {
    const user = this.userRepo.findLogginedUser(dto.username, dto.password);

    if (user === undefined) {
      throw new HttpError(400, "user not found");
    }
    return user;
  }
  loginUserById(userId: string | undefined) {
    const loggedInUser = this.userRepo.findUserById(userId);
    return loggedInUser;
  }
}
