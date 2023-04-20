import User from "../../models/user.js";
import { hashedPassword, validateEmail } from "../../utils/index.js";
import bot from "../bot.js";
import { sendMainMenu } from "./message.js";

export const auth = async (msg, chatId, states) => {
  let state = states.get(chatId);

  switch (state?.registrationStep) {
    case 0: {
      bot.sendMessage(
        chatId,
        "Welcome to Currency Tracker chat bot! To use its services, please register by entering your email address:"
      );
      state.registrationStep = 1;
      states.set(chatId, state);
      break;
    }
    case 1: {
      state.email = msg.text;
      if (!validateEmail(state.email)) {
        bot.sendMessage(
          chatId,
          "Invalid email address. Please enter a valid email address:"
        );
        break;
      }
      state.registrationStep = 2;
      states.set(chatId, state);
      bot.sendMessage(chatId, "Please enter your name:");

      break;
    }

    case 2: {
      state.name = msg.text;
      if (!state.name) {
        bot.sendMessage(chatId, "NoName. Please enter a name:");
        return;
      }
      state.registrationStep = 3;
      states.set(chatId, state);
      bot.sendMessage(chatId, "Please enter your password:");
      break;
    }
    case 3: {
      const password = msg.text;
      const hashPass = await hashedPassword(password);

      const newUserData = new User({
        telegram_id: chatId,
        email: state.email,
        password: hashPass,
        name: state.name,
      });

     const user = await newUserData.save();
      bot.sendMessage(chatId, `${state.name} has successfully registered!`);
      states.delete(chatId);
      setTimeout(() => {
        sendMainMenu({ chatId, user, states, bot });
      }, 2000);
      break;
    }
  }
  return;
};
