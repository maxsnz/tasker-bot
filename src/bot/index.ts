import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import {
  createTask,
  completeTask,
  findOrCreateUser,
  getTasks,
  MessageChat,
  getMarkupForAllTasks,
  getAllTasksMessage,
} from "./bot";

dotenv.config();

const token = process.env.TELEGRAM_TOKEN || "";

export const startBot = () => {
  // const token = await Setting.getByKey("telegramToken");
  // eslint-disable-next-line no-console
  if (!token) console.error("no token");

  const bot = new Telegraf(token);
  // const bot = new TelegramBotApi(token, { polling: true });
  // eslint-disable-next-line no-console
  console.log("bot created");

  const getTasksKeyboard = () => {
    return {
      reply_markup: {
        keyboard: [[{ text: "📋 Show all tasks" }]],
        persistent: true,
        resize_keyboard: true,
      },
    };
  };

  bot.on(message("text"), async (ctx) => {
    // eslint-disable-next-line no-console
    // console.log("ctx.message", ctx.message);

    try {
      // const chatId = ctx.message.chat.id;
      const messageChat = ctx.message.chat as MessageChat;
      const tgUserID = ctx.message.from.id;
      const user = await findOrCreateUser(tgUserID, messageChat);
      const messageText = ctx.message.text;

      if (!messageText) return;

      if (messageText === "/start") {
        await ctx.reply(
          "👋 Welcome to Kotodom Tasker Bot!\n\n" +
            "I can help you manage your tasks. Here's what I can do:\n" +
            "• Create a task - just send me any message\n" +
            "• View all tasks - tap '📋 Show all tasks'\n" +
            "• Complete tasks - use checkmarks under the task list\n\n" +
            "Let's get started! Send me your first task or check existing ones.",
          getTasksKeyboard(),
        );
        return;
      }

      if (messageText === "📋 Show all tasks") {
        const tasks = await getTasks(user);
        await ctx.reply(getAllTasksMessage(tasks), {
          ...getTasksKeyboard(),
          reply_markup: getMarkupForAllTasks(tasks),
        });
        return;
      }

      await createTask(user, messageText);
      const tasks = await getTasks(user);

      await ctx.reply(getAllTasksMessage(tasks), {
        ...getTasksKeyboard(),
        reply_markup: getMarkupForAllTasks(tasks),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });

  bot.action(/complete_task_(\d+)/, async (ctx) => {
    try {
      const taskId = parseInt(ctx.match[1], 10);
      await completeTask(taskId);
      await ctx.answerCbQuery(
        `Task ${taskId} completed successfully`,
      );

      // Get updated task list
      const messageChat = ctx.callbackQuery.from as MessageChat;
      const user = await findOrCreateUser(
        ctx.callbackQuery.from.id,
        messageChat,
      );
      const tasks = await getTasks(user);

      // Update message with new task list
      await ctx.editMessageText(getAllTasksMessage(tasks), {
        reply_markup: getMarkupForAllTasks(tasks),
      });
    } catch (e) {
      console.error(e);
      try {
        await ctx.answerCbQuery("Error deleting task");
      } catch (e) {
        console.error(e);
      }
    }
  });

  bot.launch().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
  });

  return bot;
};
