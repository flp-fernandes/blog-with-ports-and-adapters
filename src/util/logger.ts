import {
  createLogger,
  format,
  transports
} from 'winston';

export class Logger {
  private readonly _info: string;

  constructor (info: string) {
    this._info = info;
  }

  console () {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] >>> ${this._info} - ${level}: ${message}`;
    });

    return createLogger({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      ),
      transports: [new transports.Console()]
    });
  }
}
