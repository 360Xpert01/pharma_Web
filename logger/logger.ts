import pino from "pino";
import type { Logger as PinoLogger, LogEvent } from "pino";
import { getLoggerConfig } from "./logger-config";
import { formatClientLogMessage } from "./logger-utils";

const isBrowser = typeof window !== "undefined" && typeof navigator !== "undefined";

/**
 * Create a safe no-op logger for SSR imports so server code won't crash.
 */
const createNoopLogger = (): PinoLogger => {
  const noop = () => {};
  const proxy = new Proxy(
    {},
    {
      get: () => noop,
    }
  ) as unknown as PinoLogger & { child: () => PinoLogger };

  proxy.child = () => proxy as unknown as PinoLogger;
  return proxy as unknown as PinoLogger;
};

const cfg = getLoggerConfig();

export const logger: PinoLogger = isBrowser
  ? pino({
      level: cfg.level || "debug",
      browser: {
        asObject: true,
        // write to browser console for immediate visibility
        write: (logObject: any) => {
          try {
            const level = logObject.level ?? logObject.levelLabel ?? "info";
            const msg = logObject.msg ?? "";
            switch (level) {
              case 10:
              case "trace":
                console.trace(msg, logObject);
                break;
              case 20:
              case "debug":
                console.debug(msg, logObject);
                break;
              case 30:
              case "info":
                console.info(msg, logObject);
                break;
              case 40:
              case "warn":
                console.warn(msg, logObject);
                break;
              case 50:
              case "error":
              case 60:
              case "fatal":
                console.error(msg, logObject);
                break;
              default:
                console.log(msg, logObject);
            }
          } catch {
            // ignore console errors
          }
        },
        // transmit to configured endpoint and fire onLog hook
        transmit: {
          level: cfg.level || "debug",
          send: (level: string, logEvent: LogEvent) => {
            try {
              cfg.events?.onLog?.(logEvent);
              if (!cfg.logApi) return;
              const body = { payload: formatClientLogMessage(logEvent), level };
              const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
              navigator.sendBeacon(cfg.logApi, blob);
            } catch {
              // swallow transmit errors
            }
          },
        },
      },
      formatters: {
        level: (label: string) => ({ level: label }),
      },
    })
  : createNoopLogger();

/**
 * Convenience: return child logger per module.
 */
export const createLogger = (moduleName = "app"): PinoLogger => {
  try {
    return logger.child({ module: moduleName });
  } catch {
    return logger;
  }
};

/**
 * Expose clientLogger factory (keeps compatibility with previous code)
 */
export const clientLogger = (): PinoLogger => logger;

type LogContext = Record<string, unknown>;

export const logHelpers = {
  logUIEvent: (event: string, details: LogContext = {}) => {
    logger.info({ type: "ui_event", event, ...details }, `UI Event: ${event}`);
  },

  logUserAction: (action: string, details: LogContext = {}) => {
    logger.info({ type: "user_action", action, ...details }, `User Action: ${action}`);
  },

  logApiResult: (endpoint: string, status: number, duration: number, data: LogContext = {}) => {
    logger.debug(
      { type: "api_result", endpoint, status, duration, ...data },
      `API Result: ${endpoint}`
    );
  },

  logPerformance: (metric: string, value: number, unit = "ms") => {
    logger.info(
      { type: "performance_metric", metric, value, unit },
      `Performance Metric: ${metric}`
    );
  },

  logError: (error: Error | unknown, context: LogContext = {}) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    const stack = error instanceof Error ? error.stack : undefined;
    logger.error({ type: "frontend_error", message, stack, ...context }, "Frontend Error");
  },
};

export default logger;
