import type { LoggerConfig, LogLevels } from "./logger-types";
import type pino from "pino";

let logConfig: LoggerConfig = {
  level: (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevels) || "debug",
  events: {
    onLog: (event: pino.LogEvent) => {
      // default: show raw log event in browser console for dev
      // eslint-disable-next-line no-console
      console.debug("[logger:onLog]", event);
    },
  },
};

export const logLevels: Record<LogLevels, LogLevels> = {
  error: "error",
  warn: "warn",
  info: "info",
  debug: "debug",
  trace: "trace",
  fatal: "fatal",
  silent: "silent",
} as const;

export const initLogger = (config: Partial<LoggerConfig>): void => {
  logConfig = { ...logConfig, ...config };
};

export const getLoggerConfig = (): LoggerConfig => logConfig;
