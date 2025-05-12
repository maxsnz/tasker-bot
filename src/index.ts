import * as dotenv from "dotenv";
import { startBot } from "./bot";
import "./models";

dotenv.config();

const bot = startBot();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
