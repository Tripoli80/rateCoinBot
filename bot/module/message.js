import { coinServices } from "../../services/coin-services.js";
import userService from "../../services/user-services.js";
import { inlineKeyboard } from "./inlineKeyboard.js";

export const getRateBySymbol = async ({ chatId, msg, user, states, bot }) => {
  const result = await parseCurrencyCode({ chatId, msg, states, bot });
  if (!result) return;

  const coinId = result[0]?.id;
  const price = await coinServices.getCoinPrice(
    coinId,
    user?.basecurrency?.toLowerCase()
  );

  bot.sendMessage(
    chatId,
    `${coinId} to ${user?.basecurrency}: ${
      price[coinId][user?.basecurrency?.toLowerCase()]
    }`
  );
  states.delete(chatId);
  return true;
};
export const getRateByid = async ({ chatId, coinId, user, states, bot }) => {
  const price = await coinServices.getCoinPrice(
    coinId,
    user?.basecurrency?.toLowerCase()
  );

  bot.sendMessage(
    chatId,
    `${coinId} to ${user?.basecurrency}: ${
      price[coinId][user?.basecurrency?.toLowerCase()]
    }`
  );
  states.delete(chatId);
  return true;
};

export const parseCurrencyCode = async ({ chatId, msg, states, bot }) => {
  const currencyCode = msg.text;
  const result = await coinServices.getCurrencyData(currencyCode);
  if (!result) {
    bot.deleteMessage(chatId, msg.message_id);
    bot.editMessageText(
      "Currency not found. Please enter correct symbol currency::",
      {
        chat_id: chatId,
        message_id: states?.get(chatId)?.message_id,
      }
    );
    return;
  }
  return result;
};

export const sendMainMenu = async ({ chatId, user, states, bot }) => {
  const actionsKeyboard = inlineKeyboard.mainActionsKeyboard();
  bot.sendMessage(
    chatId,
    `We glade to see you again, ${user.name}`,
    actionsKeyboard
  );
  states.delete(chatId);
};

export const updateUser = async ({ chatId, msg, user, states, bot, field }) => {
  const text = msg.text;
  const update = {
    _id: user._id,
    [field]: text,
  };
  const result = await userService.update(update);
  if (!result) {
    bot.sendMessage(chatId, `Error, can not change ${field}`);
    setTimeout(() => {
      sendMainMenu({ chatId, user, states, bot });
    }, 2000);

    return;
  }
  bot.sendMessage(chatId, `Sucsess changed, new ${field}: ${text}`);
  setTimeout(() => {
    sendMainMenu({ chatId, user: result, states, bot });
  }, 2000);
};
