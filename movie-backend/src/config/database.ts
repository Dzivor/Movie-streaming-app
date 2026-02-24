import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

//Validating required environment variables
const requiredEnv = [
  "DB_HOST",
  "DB_PORT",
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_NAME",
] as const;

for (const env of requiredEnv) {
  if (!process.env[env] || process.env[env]?.trim() === "") {
    throw new Error(`Missing required environment variable: ${env}`);
  }
}

const dbPort = Number(process.env.DB_PORT);
if (Number.isNaN(dbPort)) {
  throw new Error(`DB_PORT must be a valid number`);
}
//TypeORM DataSource config
export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,

  port: dbPort,

  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  synchronize: true,

  logging: false,

  entities: ["src/entities/**/*.ts"],
});
