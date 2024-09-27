import winston from "winston";
import { injectable } from "inversify";
import { LOGGER, PROJECT } from "@/backend/shared/config";
import { ILogger } from "@/backend/shared/interfaces/logger.interface";

const customLevels = {
  levels: {
    ok: LOGGER.okCode,
    debug: winston.config.syslog.levels.debug,
    info: winston.config.syslog.levels.info,
    warn: winston.config.syslog.levels.warn,
    error: winston.config.syslog.levels.error,
  },
  colors: {
    ok: "green",
    debug: "blue",
    info: "cyan",
    warn: "yellow",
    error: "red",
  },
};

winston.addColors(customLevels.colors);

@injectable()
export class WinstonLogger implements ILogger {
  logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "ok",
      levels: customLevels.levels,
      transports: [
        new winston.transports.Console(
          PROJECT.envName === "local"
            ? {
                format: winston.format.combine(
                  winston.format.json(),
                  winston.format.colorize(),
                  winston.format.printf((info: any) => {
                    const { level, message, ...args } = info;
                    return `[${level}]${args?.dd?.module}: ${JSON.stringify(
                      message,
                      null,
                      2
                    )}`;
                  })
                ),
              }
            : {
                format: winston.format.combine(
                  winston.format.json(),
                  winston.format.printf((info: any) => {
                    return JSON.stringify(info);
                  })
                ),
              }
        ),
      ],
    });
  }

  public info(title: string, data?: any) {
    this.log("info", title, data);
  }

  public warn(title: string, data?: any) {
    this.log("warn", title, data);
  }

  public error(title: string, data?: any) {
    this.log("error", title, data);
  }

  public success(title: string, data?: any) {
    this.log("ok", title, data);
  }

  private log(
    level: keyof typeof customLevels.levels,
    title: string,
    data?: any
  ) {
    const body = {
      dd: {
        env: PROJECT.envName,
        service: LOGGER.dockerName,
        host: PROJECT.host,
        module: title,
        type: data?.type || "Default",
      },
      level,
      message: data || "",
    };

    this.logger.log(level, body);
  }
}
