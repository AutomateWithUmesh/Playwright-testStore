import winston from 'winston';

class Logger {
    private static loggerInstance: winston.Logger;

    // Setup the logger
    public static getLogger(): winston.Logger {
        if (!Logger.loggerInstance) {
            Logger.loggerInstance = winston.createLogger({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
                ),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: 'logs/app.log' }) // Define a new log file
                ]
            });
        }
        return Logger.loggerInstance;
    }
}

export default Logger;
