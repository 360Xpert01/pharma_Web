export type LogLevel = "debug" | "info" | "warn" | "error";

interface LoggerOptions {
  level?: LogLevel;
  json?: boolean;
}

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  private level: LogLevel;
  private json: boolean;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? (process.env.NODE_ENV === "production" ? "info" : "debug");
    this.json = options.json ?? (process.env.NODE_ENV === "production");
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.level];
  }

  private format(level: LogLevel, args: unknown[]) {
    const timestamp = new Date().toISOString();
    if (this.json) {
      return JSON.stringify({
        level,
        timestamp,
        message: args.map(String).join(" "),
        args,
      });
    }
    const tag = `[${timestamp}] [${level.toUpperCase()}]`;
    return [tag, ...args];
  }

  debug(...args: unknown[]) {
    if (this.shouldLog("debug")) {
      console.debug(...this.format("debug", args));
    }
  }

  info(...args: unknown[]) {
    if (this.shouldLog("info")) {
      console.info(...this.format("info", args));
    }
  }

  warn(...args: unknown[]) {
    if (this.shouldLog("warn")) {
      console.warn(...this.format("warn", args));
    }
  }

  error(...args: unknown[]) {
    if (this.shouldLog("error")) {
      console.error(...this.format("error", args));
    }
  }
}

export const logger = new Logger();


// import { logger } from "@/lib/logger";

// export default function handler() {
//   logger.debug("Debugging details", { data: 123 });
//   logger.info("User logged in", { id: 42 });
//   logger.warn("API response slow", { ms: 1500 });
//   logger.error("Database connection failed!", new Error("timeout"));

//   return "done";
// }

