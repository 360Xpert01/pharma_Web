import pino, { type LogEvent, type Logger as PinoLogger } from "pino";

/** Log level types */
export type LogLevel = "error" | "warn" | "info" | "debug" | "trace" | "fatal" | "silent";

/** Logger configuration */
export interface LoggerConfig {
  logApi?: string;
  level?: LogLevel;
  events?: {
    onLog?: (event: LogEvent) => void;
  };
}

/** Default configuration */
let config: LoggerConfig = {
  level: (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel) || "debug",
  events: {
    onLog: (event: LogEvent) => console.debug("[logger:onLog]", event),
  },
};

/** Allow updating config at runtime */
export const initLogger = (cfg: Partial<LoggerConfig>) => {
  config = { ...config, ...cfg };
};
export const getLoggerConfig = () => config;

/** Numeric → name map */
const LEVELS: Record<number, string> = {
  10: "trace",
  20: "debug",
  30: "info",
  40: "warn",
  50: "error",
  60: "fatal",
};

/** SSR-safe no-op logger */
const createNoopLogger = (): PinoLogger => {
  const noop = () => {};
  const proxy = new Proxy({}, { get: () => noop }) as PinoLogger;
  // @ts-ignore
  proxy.child = () => proxy;
  return proxy;
};

/** Normalize Error objects for serialization */
const normalizeLogMessage = (event: LogEvent): LogEvent => {
  event.messages = event.messages.map((msg) => {
    if (msg && typeof msg === "object" && "stack" in msg) {
      return {
        err: {
          // @ts-ignore
          type: msg.type ?? typeof msg,
          // @ts-ignore
          stack: msg.stack,
          // @ts-ignore
          message: msg.message ?? String(msg),
        },
      };
    }
    return msg;
  });
  return event;
};

/** Environment check */
const isBrowser = typeof window !== "undefined";

/** Main logger */
export const logger: PinoLogger = isBrowser
  ? pino({
      level: config.level || "debug",
      browser: {
        asObject: true,
        write: (obj: any) => {
          const levelName = LEVELS[obj.level] || obj.level || "info";
          const msg = obj.msg || "";

          // Replace numeric level with readable one
          const readableLog = { ...obj, level: levelName };

          // Type-safe, bound console methods
          const consoleMethods: Record<string, (...args: any[]) => void> = {
            trace: console.trace.bind(console),
            debug: console.debug.bind(console),
            info: console.info.bind(console),
            warn: console.warn.bind(console),
            error: console.error.bind(console),
            fatal: console.error.bind(console),
          };

          const consoleFn =
            consoleMethods[levelName as keyof typeof consoleMethods] ?? console.log.bind(console);

          // Print readable message + structured object
          consoleFn(`[${levelName.toUpperCase()}] ${msg}`, readableLog);
        },
        transmit: {
          level: config.level || "debug",
          send: (level: string, event: LogEvent) => {
            config.events?.onLog?.(event);
            if (!config.logApi) return;

            const payload = { payload: normalizeLogMessage(event), level };
            navigator.sendBeacon(
              config.logApi,
              new Blob([JSON.stringify(payload)], { type: "application/json" })
            );
          },
        },
      },
      formatters: {
        level: (label) => ({ level: label }), // ensure stored as string level
      },
    })
  : createNoopLogger();

/** Create module-specific child logger */
export const createLogger = (module = "app") => logger.child({ module });
