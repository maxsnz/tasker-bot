import * as dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    database: process.env.DB,
    dialect: "postgres",
    host: process.env.DB_HOST,
    logging: false,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
  },
  production: {
    database: process.env.DB,
    dialect: "postgres",
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
  },
};

export default config;
