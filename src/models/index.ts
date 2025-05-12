// import { fileURLToPath } from "url";
// import { dirname } from "path";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import configs from "../config/db";
import User from "./User.model";
import Setting from "./Setting.model";
import Task from "./Task.model";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const env = (process.env.NODE_ENV || "development") as
  | "development"
  | "production";

const config = configs[env] as SequelizeOptions;

const sequelize = new Sequelize({
  ...config,
  // modelMatch: (filename, member) => {
  //   return (
  //     filename.substring(0, filename.indexOf(".model")) ===
  //     member.toLowerCase()
  //   );
  // },
});
sequelize.addModels([User, Setting, Task]);
// sequelize.addModels([`${__dirname}/src/models/*.model.ts`]);

export default sequelize;
