import dotenv from 'dotenv';
import program from '../utils/commander.js';

// dotenv.config();

const enviroment = program.opts().mode.toUpperCase();
// const enviroment = "prod";

console.log("enviroment: ", enviroment === "DEV" ? "development mode" : "production mode");

dotenv.config({
  path: enviroment === "DEV" ? "./src/utils/.env.development" : "./src/utils/.env.production"
});

export default {
  port: process.env.PORT,
  urlMongo: process.env.MONGO_URL,
}