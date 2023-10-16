import { users } from "../../routes/user.route";
import { HttpError } from "../../utility/http-error";

export const login = (dto: { username: string; password: string }) => {
  const user = users.find(
    (userItem) =>
      userItem.username === dto.username && userItem.password === dto.password
  );
  if (user === undefined) {
    throw new HttpError(400, "user not found");
  }
  return user;
};
