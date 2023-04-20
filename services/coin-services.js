import axios from "axios";

// ...
export const coinServices = {};
coinServices.getCurrencyData = async (symbol) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );

    const currencies = response.data.filter(
      (currency) => currency.symbol.toLowerCase() === symbol?.toLowerCase()
    );

    if (currencies.length > 0) {
      return currencies;
    }
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }

  return null;
};

coinServices.raitBySymbol = async (symbol) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );

    const currencies = response.data.filter(
      (currency) => currency.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (currencies.length > 0) {
      return currencies;
    }
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }

  return null;
};

coinServices.getCoinPrice = async (coinId, currency) => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: coinId, // Идентификатор криптовалюты, например "bitcoin"
        vs_currencies: currency, // Валюта для сравнения, например "usd"
      },
    }
  );

  return response.data;
};
