import Task from "../models/Task.model";
import User from "../models/User.model";

export interface MessageChat {
  first_name?: string;
  last_name?: string;
  username: string;
}

export const findOrCreateUser = async (
  id: number,
  messageChat: MessageChat,
) => {
  const user = await User.findByPk(id);

  if (!user) {
    return User.create({
      chatId: id,
      createdAt: new Date(),
      id,
      name: messageChat.username,
    });
  }

  return user;
};

export const createTask = async (user: User, messageText: string) => {
  const task = await Task.create({
    createdAt: new Date(),
    date: new Date(),
    isFinished: false,
    text: messageText,
    userId: user.id,
  });

  return task;
};

export const getTasks = async (user: User) => {
  const tasks = await Task.findAll({
    where: {
      isFinished: false,
      userId: user.id,
    },
  });

  return tasks.map((task) => ({
    id: task.id,
    text: task.text,
  }));
};

export const completeTask = async (taskId: number) => {
  await Task.update({ isFinished: true }, { where: { id: taskId } });
};

export const getMarkupForAllTasks = (
  tasks: Array<{ id: number; text: string }>,
) => {
  const buttons = tasks.map((task, index) => ({
    callback_data: `complete_task_${task.id}`,
    text: `✅ ${index + 1}`,
  }));

  const groupedButtons = [];
  for (let i = 0; i < buttons.length; i += 6) {
    groupedButtons.push(buttons.slice(i, i + 6));
  }

  return {
    inline_keyboard: groupedButtons,
  };
};

export const getAllTasksMessage = (
  tasks: Array<{ id: number; text: string }>,
) => {
  return tasks.length > 0
    ? `Your tasks:\n\n${tasks
        .map((task, index) => `${index + 1}. ${task.text}`)
        .join("\n")}`
    : "You don't have any active tasks";
};
