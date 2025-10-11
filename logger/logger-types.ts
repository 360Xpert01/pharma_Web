import type pino from "pino";

export type LogLevel = "error" | "debug" | "fatal" | "info" | "trace" | "silent" | "warn";

export type LogLevels = "error" | "warn" | "info" | "debug" | "trace" | "fatal" | "silent";

export type OnLog = (event: pino.LogEvent) => void;

export interface LoggerConfig {
  /**
   * Beacon/HTTP endpoint to send client logs to (optional).
   */
  logApi?: string;

  /**
   * Default client log level.
   */
  level?: LogLevels;

  /**
   * Optional hooks; onLog receives the raw pino LogEvent.
   */
  events?: {
    onLog?: OnLog;
  };
}
