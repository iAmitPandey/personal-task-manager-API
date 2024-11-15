import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = './logs'; 

const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), 
    new DailyRotateFile({
      dirname: logDirectory,
      filename: '%DATE%-app.log', 
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', 
      level: 'info', 
    }),
  ],
});

export default logger;