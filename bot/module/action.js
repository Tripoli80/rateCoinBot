import userService from "../../services/user-services.js";
import { inlineKeyboard } from "./inlineKeyboard.js";

export const action = {};

action.select_base_currency = async ({ bot, chat_id, message_id }) => {
  const actionsKeyboard = inlineKeyboard.basicCurrencyKeyboard();
  bot.editMessageText("Chose carrency", {
    chat_id,
    message_id,
    ...actionsKeyboard,
  });
};

action.set_base_currency = async ({
  _id,
  bot,
  chat_id,
  message_id,
  currency,
}) => {
  await userService.update({ _id, basecurrency: currency });

  const actionsKeyboard = inlineKeyboard.mainActionsKeyboard();
  bot.editMessageText(`${currency} - your basic currency. Chose option:`, {
    chat_id,
    message_id,
    ...actionsKeyboard,
  });
};


action.rate_by_symbol = async ({
  _id,
  bot,
  chat_id,
  message_id,
  currency,
  states,
}) => {
  states.set(chat_id, {
    message_id,
    position: "rate_by_symbol",
  });
  bot.editMessageText("Please enter the currency code:", {
    chat_id,
    message_id,
  });
};

action.update_user_data = async ({
  _id,
  bot,
  chat_id,
  message_id,
  currency,
  states,
}) => {
  states.set(chat_id, {
    message_id,
    position: "update_user_data",
  });
  const actionsKeyboard = inlineKeyboard.updateUser();
  bot.editMessageText(`What do you want change`, {
    chat_id,
    message_id,
    ...actionsKeyboard,
  });
};

action.update_user_name = async ({
  _id,
  bot,
  chat_id,
  message_id,
  currency,
  states,
}) => {
  states.set(chat_id, {
    message_id,
    position: "update_user_name",
  });
  bot.editMessageText(`Write new Name:`, {
    chat_id,
    message_id,
  });
};

action.update_user_email = async ({
  _id,
  bot,
  chat_id,
  message_id,
  currency,
  states,
}) => {
  states.set(chat_id, {
    message_id,
    position: "update_user_email",
  });
  bot.editMessageText(`Write new email:`, {
    chat_id,
    message_id,
  });
};

action.favorite_currency = async ({
  _id,
  bot,
  chat_id,
  message_id,
  currency,
  states,
}) => {
  states.set(chat_id, {
    message_id,
    position: "favorite_currency",
  });
  const actionsKeyboard = inlineKeyboard.favoriteCurencyMenu();
  bot.editMessageText(`What do you want`, {
    chat_id,
    message_id,
    ...actionsKeyboard,
  });
};

action.add_favorite_currency = async ({
  _id,
  bot,
  chat_id,
  message_id,
  currency,
  states,
}) => {
  states.set(chat_id, {
    message_id,
    position: "add_favorite_currency",
  });

  bot.editMessageText(`Please enter the currency code:`, {
    chat_id,
    message_id,
  });
};
action.show_favorite_currency = async ({
  _id,
  user,
  bot,
  chat_id,
  message_id,
  currency,
  states,
}) => {
  states.set(chat_id, {
    message_id,
    position: "show_favorite_currency",
  });
  const { favoritecoins } = user;

  const actionsKeyboard = inlineKeyboard.favoriteCoins(favoritecoins);

  bot.editMessageText(`Chose coin:`, {
    chat_id,
    message_id,
    ...actionsKeyboard,
  });
};
