import { app } from "./api";
import { User } from "./modules/user/model/user";
import { AppDataSource } from "./utility/data-source";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const PORT = 3000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log("listening on port " + PORT);
  });
});
