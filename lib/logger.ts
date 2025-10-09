import pino from "pino";

// Define types for better TypeScript support
interface LogContext {
  [key: string]: any;
}

interface ApiResultData {
  [key: string]: any;
}

// Create browser logger instance
const logger = pino({
  name: "logger",
  level: process.env.NEXT_PUBLIC_LOG_LEVEL || "debug",
  browser: {
    asObject: true,
    serialize: true,
    write: (log: any) => {
      switch (log.level) {
        case 10: // trace
          console.trace(`[TRACE] ${log.msg}`, log);
          break;
        case 20: // debug
          console.debug(`[DEBUG] ${log.msg}`, log);
          break;
        case 30: // info
          console.info(`[INFO] ${log.msg}`, log);
          break;
        case 40: // warn
          console.warn(`[WARN] ${log.msg}`, log);
          break;
        case 50: // error
          console.error(`[ERROR] ${log.msg}`, log);
          break;
        case 60: // fatal
          console.error(`[FATAL] ${log.msg}`, log);
          break;
        default:
          console.log(`[LOG] ${log.msg}`, log);
      }
    },
  },
  formatters: {
    level: (label: string) => ({ level: label }),
  },
});

// Child loggers for different UI modules
export const createLogger = (module: string) => {
  return logger.child({ module });
};

// Log helpers for structured client events
export const logHelpers = {
  logUIEvent: (event: string, details: LogContext = {}) => {
    logger.info(
      {
        type: "ui_event",
        event,
        ...details,
      },
      `UI Event: ${event}`
    );
  },

  logUserAction: (action: string, context: LogContext = {}) => {
    logger.info(
      {
        type: "user_action",
        action,
        ...context,
      },
      `User Action: ${action}`
    );
  },

  logApiResult: (endpoint: string, status: number, duration: number, data: ApiResultData = {}) => {
    logger.debug(
      {
        type: "api_result",
        endpoint,
        status,
        duration,
        ...data,
      },
      `API Result: ${endpoint}`
    );
  },

  logPerformance: (metric: string, value: number, unit: string = "ms") => {
    logger.info(
      {
        type: "performance_metric",
        metric,
        value,
        unit,
      },
      `Performance Metric: ${metric}`
    );
  },

  logError: (error: Error | unknown, context: LogContext = {}) => {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    logger.error(
      {
        type: "frontend_error",
        message: errorMessage,
        stack: errorStack,
        ...context,
      },
      "Frontend Error"
    );
  },
};

// Named export for logger (this fixes the import errors)
export { logger };

// Default export with all utilities
export default {
  logger,
  createLogger,
  ...logHelpers,
};
