import winston, { transports } from "winston";

// const customLevelsOptions = {
//     levels: {
//         fatal: 0,
//         error: 1,
//         warning: 2,
//         http: 3,
//         info: 4,
//         debug: 5
//     },
//     colors: {
//         fatal: 'red',
//         error: 'magenta',
//         warning: 'yellow',
//         http: 'red',
//         info: 'blue',
//         debug: 'white'
//     }
// };
// winston.addColors(customLevelsOptions.colors);
// // Logger en env desarrollo
// export const devLogger = winston.createLogger({
//     // Declaramos el trasnport
//     levels: customLevelsOptions.levels,
//     transports: [
//         new transports.Console(
//             {
//                 level: "debug",
//                 format: winston.format.combine(
//                     winston.format.colorize({ colors: customLevelsOptions.colors }),
//                     winston.format.simple()
//                 )
//             }
//         ),
//         new transports.File(
//             {
//                 filename: './errors.log',
//                 level: 'error', //Cambiamos el logger level name.
//                 format: winston.format.simple()
//             }
//         )
//     ]
// })

// // Logger en env prod
// export const prodLogger = winston.createLogger({
//     // Declaramos el trasnport
//     levels: customLevelsOptions.levels,
//     transports: [
//         new transports.Console(
//             {
//                 level: "info",
//                 format: winston.format.combine(
//                     winston.format.colorize({ colors: customLevelsOptions.colors }),
//                     winston.format.simple()
//                 )
//             }
//         ),
//         new transports.File(
//             {
//                 filename: './errors.log',
//                 level: 'error', //Cambiamos el logger level name.
//                 format: winston.format.simple()
//             }
//         )
//     ]
// })

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "cyan",
        error: "red",
        warning: "yellow",
        info: "green",
        http: "white",
        debug: "blue",
    },
};

winston.addColors(customLevelsOptions.colors);
export const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new transports.Console({
            level: "debug",
        }),
        new transports.File({
            filename: "logs/dev/combined.log",
            level: "debug",
        }),
    ],
    format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
    ),
    exceptionHandlers: [
        new transports.File({ filename: "logs/dev/exceptions.log" }),
    ],
});

export const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new transports.Console({ level: "info" }),
        new transports.File({
            filename: "logs/prod/error.log",
            level: "error",
        }),
        new transports.File({ filename: "logs/prod/combined.log" }),
    ],
    format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
    ),
    exceptionHandlers: [
        new transports.File({ filename: "logs/prod/exceptions.log" }),
    ],
});

