import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
  .option('-d', 'Varaible para debug', false) 
  .option('-p <port>', 'Puerto del servidor', 8080)
  .option('--mode <mode>', 'Modo de trabajo', 'dev')

  .requiredOption('-u <user>', 'Usuario que va a utilizar el aplicativo.', 'No se ha declarado un usuario.');
program.parse();

process.on("exit", code => {
  console.log("Codigo de salida del proceso: " + code);
});

process.on("uncaughtException", exception => {
  console.log(`Exception no capturada: ${exception}`)
});

process.on("message", message => {
  console.log(`Mensaje recibido: ${message}`);
});

const enviroment = program.opts().mode.toUpperCase();

console.log("enviroment: ", enviroment === "DEV" ? "development mode" : "production mode");

dotenv.config({
  path: enviroment === "DEV" ? "./src/utils/.env.development" : "./src/utils/.env.production"
});

export default {
  port: process.env.PORT || 3001,
  urlMongo: process.env.MONGO_URL,
  enviroment: enviroment
}