import bot from "./bot.js";
import userService from "../services/user-services.js";

import { auth } from "./module/auth.js";
import { inlineKeyboard } from "./module/inlineKeyboard.js";
import { action } from "./module/action.js";
import { coinServices } from "../services/coin-services.js";
import {
  getRateBySymbol,
  getRateByid,
  parseCurrencyCode,
  sendMainMenu,
  updateUser,
} from "./module/message.js";
import { validateEmail } from "../utils/index.js";

async function startBot() {
  const states = new Map();
  console.log("Bot started");

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const user = await userService.get(chatId);
    if (msg.text === "/start") {
      states.delete(chatId);
    }

    const currentState = states.get(chatId);
    let state = states.get(chatId) || {
      registrationStep: 0,
      email: "",
      name: "",
    };
    if (!user) {
      states.set(chatId, state);
      auth(msg, chatId, states);
      return;
    }

    switch (currentState?.position) {
      case "awaiting_currency_code": {
        await parseCurrencyCode({ chatId, msg, states, bot });
        break;
      }
      case "rate_by_symbol": {
        const res = await getRateBySymbol({ chatId, msg, user, states, bot });
        if (res)
          setTimeout(() => {
            sendMainMenu({ chatId, user, states, bot });
          }, 2000);
        break;
      }
      case "update_user_name": {
        await updateUser({ chatId, msg, user, states, bot, field: "name" });
        break;
      }
      case "update_user_email": {
        const email = msg.text;
        if (!validateEmail(email)) {
          bot.sendMessage(
            chatId,
            "Invalid email address. Please enter a valid email address:"
          );
          break;
        }
        await updateUser({ chatId, msg, states, bot, user, field: "email" });
        break;
      }
      case "add_favorite_currency": {
        const result = await parseCurrencyCode({ chatId, msg, states, bot });
        if (!result) return;
        const favoritecoins = result[0];
        const update = { _id: user._id, favoritecoins };
        const updateedUser = await userService.update(update);
        if (updateedUser) {
          setTimeout(() => {
            sendMainMenu({ chatId, user, states, bot });
          }, 2000);
        }
        break;
      }

      default: {
        await sendMainMenu({ chatId, user, states, bot });
      }
    }
  });

  bot.on("callback_query", async (callbackQuery) => {
    const chat_id = callbackQuery.message.chat.id;
    const message_id = callbackQuery.message.message_id;
    let callback = callbackQuery.data;
    const user = await userService.get(chat_id);
    const data = { _id: user._id, bot, chat_id, user, message_id };
    const [act, currencyId] = callbackQuery.data.split(":");
    if (act && currencyId) {
      callback = act;
    }
    data.states = states;

    switch (callback) {
      case "select_base_currency":
        await action.select_base_currency(data);
        break;

      case "rate_by_symbol": {
        await action.rate_by_symbol(data);
        break;
      }
      case "update_user_data":
        action.update_user_data(data);
        break;
      case "select_base_usd":
        data.currency = "USD";
        await action.set_base_currency(data);
        break;
      case "select_base_uah":
        data.currency = "UAH";
        await action.set_base_currency(data);
        break;
      case "select_base_eur":
        data.currency = "EUR";
        await action.set_base_currency(data);
        break;
      case "update_user_name":
        await action.update_user_name(data);
        break;
      case "update_user_email":
        await action.update_user_email(data);
        break;
      case "favorite_currency":
        await action.favorite_currency(data);
        break;

      case "add_favorite_currency":
        await action.add_favorite_currency(data);
        break;
      case "show_favorite_currency":
        await action.show_favorite_currency(data);
        break;
      case "remove_favorite_currency":
        // await action.remove_favorite_currency(data);
        break;
      case "favorite_currency_get":
        const option = {
          chatId: chat_id,
          coinId: currencyId,
          user,
          states,
          bot,
        };
        const res = await getRateByid(option);
        if (res)
          setTimeout(() => {
            sendMainMenu({ chatId: chat_id, user, states, bot });
          }, 2000);
        // Обработка изменения данных пользоателя
        break;
      default:
        break;
    }
  });
}

export default startBot;
