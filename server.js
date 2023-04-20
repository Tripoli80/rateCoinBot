import mongoose from "mongoose";
import dotenv from "dotenv";
import startBot from "./bot/controller.js";
dotenv.config();

const MONGODB_URI = process.env.DB_URI;
const dbName = "YOUR_DB_NAME";

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}


// запускаем сервер и подключаемся к БД
async function startApp() {
  await connectToDatabase();
  await startBot();
}

// стартуем приложение
startApp();