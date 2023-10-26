import { v4 } from "uuid";
import { HttpError } from "../../utility/http-error";
import { User } from "./model/user";

export class UserRepository {
  users: User[] = [
    { id: v4(), username: "admin", password: "admin", role: "Admin" },
    { id: v4(), username: "rep", password: "rep", role: "Representative" },
  ];

  public findLogginedUser(username: string, password: string) {
    const user = this.users.find(
      (userItem) =>
        userItem.username === username && userItem.password === password
    );
    if (user === undefined) {
      throw new HttpError(400, "user not found");
    }
    return user;
  }
  public findUserById(userId: string | undefined) {
    const loggedInUser = this.users.find((x) => x.id === userId);
    return loggedInUser;
  }
}
