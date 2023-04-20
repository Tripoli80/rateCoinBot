export const inlineKeyboard = {};
inlineKeyboard.mainActionsKeyboard = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Set basic currency",
            callback_data: "select_base_currency",
          },
          {
            text: "Favorite_currency",
            callback_data: "favorite_currency",
          },
        ],
        [
          {
            text: "Update user data",
            callback_data: "update_user_data",
          },
          {
            text: "Get rate by symbol",
            callback_data: "rate_by_symbol",
          },
        ],
      ],
    },
  };
};

inlineKeyboard.basicCurrencyKeyboard = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "USD",
            callback_data: "select_base_usd",
          },
          {
            text: "UAH",
            callback_data: "select_base_uah",
          },
          {
            text: "EUR",
            callback_data: "select_base_eur",
          },
        ],
      ],
    },
  };
};
inlineKeyboard.updateUser = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "NAME",
            callback_data: "update_user_name",
          },
          {
            text: "EMAIL",
            callback_data: "update_user_email",
          },
        ],
      ],
    },
  };
};
inlineKeyboard.favoriteCurencyMenu = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Show",
            callback_data: "show_favorite_currency",
          },
          {
            text: "Add new",
            callback_data: "add_favorite_currency",
          },
        
        ],
      ],
    },
  };
};

inlineKeyboard.favoriteCoins = (coins) => {
  const inlineKeyboardRows = [];
  let row = [];

  coins.forEach((coin, index) => {
    row.push({
      text: coin.id,
      callback_data: `favorite_currency_get:${coin.id}`,
    });

    if ((index + 1) % 4 === 0 || index === coins.length - 1) {
      inlineKeyboardRows.push(row);
      row = [];
    }
  });
  return {
    reply_markup: {
      inline_keyboard: [
        ...inlineKeyboardRows,
      ],
    },
  };
};