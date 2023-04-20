# Телеграм-бот для отримання ціни криптовалют

Це Node.js проект телеграм-бота, який дозволяє користувачам отримувати поточну інформацію про ціни криптовалют відносно базової валюти. Бот також має функціонал зберігання вибраних валют до персонального кабінету користувача для більш швидкого запиту.

## Installation
Спочатку потрібно склонувати репозиторій:

```bash
git clone https://github.com/Tripoli80/rateCoinBot.git
```
Перейдіть до директорії проекту:
```bash
cd rateCoinBot
```
Встановіть залежності:
```bash
npm install
```
Створіть файл .env та вставте туди свої приватні ключі для Telegram та бази даних MongoDB:

```bash
TELEGRAM_BOT_TOKEN='***********'
DB_URI='mongodb+srv://********:************@cluster0.*********.mongodb.net/coinBot?retryWrites=true&w=majorit
```

Запустіть проект:
```bash
npm start
```


## Usage

Використовуйте команду /start для запуску боту а далі повинно бути все зрозуміло

## Autor

[Linkedin](https://www.linkedin.com/in/serhii-dimov/)