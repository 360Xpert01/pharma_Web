export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  correlationId?: string;
  userAgent?: string;
  ip?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  duration?: number;
  environment?: string;
  version?: string;
  component?: string;
  feature?: string;
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context: LogContext;
  args?: unknown[];
  error?: SerializedError;
  performance?: PerformanceMetrics;
}

interface SerializedError {
  name: string;
  message: string;
  stack?: string;
  code?: string | number;
  statusCode?: number;
  cause?: SerializedError;
}

interface PerformanceMetrics {
  startTime?: number;
  endTime?: number;
  duration?: number;
  memoryUsage?: NodeJS.MemoryUsage;
  operation?: string;
}

interface LoggerOptions {
  level?: LogLevel;
  json?: boolean;
  enablePerformanceTracking?: boolean;
  enableBuffering?: boolean;
  bufferSize?: number;
  flushInterval?: number;
  includeStackTrace?: boolean;
  maxStackTraceLines?: number;
  enableSampling?: boolean;
  sampleRate?: number;
  context?: LogContext;
  transports?: LogTransport[];
}

interface LogTransport {
  name: string;
  log: (entry: LogEntry) => void | Promise<void>;
  level?: LogLevel;
  enabled?: boolean;
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
  private enablePerformanceTracking: boolean;
  private enableBuffering: boolean;
  private bufferSize: number;
  private flushInterval: number;
  private includeStackTrace: boolean;
  private maxStackTraceLines: number;
  private enableSampling: boolean;
  private sampleRate: number;
  private context: LogContext;
  private transports: LogTransport[];
  private buffer: LogEntry[] = [];
  private flushTimer?: NodeJS.Timeout;
  private performanceTimers: Map<string, number> = new Map();

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? (process.env.NODE_ENV === "production" ? "info" : "debug");
    this.json = options.json ?? process.env.NODE_ENV === "production";
    this.enablePerformanceTracking = options.enablePerformanceTracking ?? false;
    this.enableBuffering = options.enableBuffering ?? false;
    this.bufferSize = options.bufferSize ?? 100;
    this.flushInterval = options.flushInterval ?? 5000;
    this.includeStackTrace = options.includeStackTrace ?? true;
    this.maxStackTraceLines = options.maxStackTraceLines ?? 10;
    this.enableSampling = options.enableSampling ?? false;
    this.sampleRate = options.sampleRate ?? 0.1;
    this.context = {
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "unknown",
      ...options.context,
    };
    this.transports = options.transports ?? [this.createConsoleTransport()];

    if (this.enableBuffering) {
      this.startFlushTimer();
    }
  }

  private createConsoleTransport(): LogTransport {
    return {
      name: "console",
      log: (entry: LogEntry) => {
        const formatted = this.formatEntry(entry);
        switch (entry.level) {
          case "debug":
            console.debug(formatted);
            break;
          case "info":
            console.info(formatted);
            break;
          case "warn":
            console.warn(formatted);
            break;
          case "error":
            console.error(formatted);
            break;
        }
      },
    };
  }

  private startFlushTimer() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.level];
  }

  private shouldSample(): boolean {
    if (!this.enableSampling) return true;
    return Math.random() < this.sampleRate;
  }

  private serializeError(error: Error): SerializedError {
    const serialized: SerializedError = {
      name: error.name,
      message: error.message,
    };

    if (this.includeStackTrace && error.stack) {
      const stackLines = error.stack.split("\n");
      serialized.stack = stackLines.slice(0, this.maxStackTraceLines).join("\n");
    }

    // Handle common error properties
    if ("code" in error) {
      serialized.code = error.code as string | number;
    }
    if ("statusCode" in error) {
      serialized.statusCode = error.statusCode as number;
    }
    if ("cause" in error && error.cause instanceof Error) {
      serialized.cause = this.serializeError(error.cause);
    }

    return serialized;
  }

  private extractArgsAndError(args: unknown[]): {
    processedArgs: unknown[];
    error?: SerializedError;
  } {
    const processedArgs: unknown[] = [];
    let error: SerializedError | undefined;

    for (const arg of args) {
      if (arg instanceof Error) {
        error = this.serializeError(arg);
      } else if (arg && typeof arg === "object" && "name" in arg && "message" in arg) {
        // Handle error-like objects
        error = this.serializeError(arg as Error);
      } else {
        processedArgs.push(arg);
      }
    }

    return { processedArgs, error };
  }

  private createLogEntry(
    level: LogLevel,
    args: unknown[],
    additionalContext?: LogContext
  ): LogEntry {
    const { processedArgs, error } = this.extractArgsAndError(args);
    const message = processedArgs
      .map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg)))
      .join(" ");

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: { ...this.context, ...additionalContext },
      args: processedArgs.length > 0 ? processedArgs : undefined,
      error,
    };

    if (this.enablePerformanceTracking) {
      entry.performance = {
        startTime: Date.now(),
        memoryUsage: typeof process !== "undefined" ? process.memoryUsage() : undefined,
      };
    }

    return entry;
  }

  private formatEntry(entry: LogEntry): string {
    if (this.json) {
      return JSON.stringify(entry, null, 0);
    }

    const timestamp = entry.timestamp;
    const level = entry.level.toUpperCase().padEnd(5);
    const context = entry.context.component ? `[${entry.context.component}]` : "";
    const correlationId = entry.context.correlationId
      ? `{${entry.context.correlationId.slice(0, 8)}}`
      : "";

    let formatted = `[${timestamp}] [${level}] ${context}${correlationId} ${entry.message}`;

    if (entry.error) {
      formatted += `\n  Error: ${entry.error.name}: ${entry.error.message}`;
      if (entry.error.stack) {
        formatted += `\n  Stack: ${entry.error.stack}`;
      }
    }

    if (entry.context.duration) {
      formatted += ` (${entry.context.duration}ms)`;
    }

    return formatted;
  }

  private async writeToTransports(entry: LogEntry) {
    const promises: Promise<void>[] = [];

    for (const transport of this.transports) {
      if (transport.enabled === false) continue;
      if (transport.level && LEVELS[entry.level] < LEVELS[transport.level]) continue;

      try {
        const result = transport.log(entry);
        if (result instanceof Promise) {
          promises.push(result);
        }
      } catch (error) {
        // Avoid infinite logging loops by using console directly
        console.error(`Transport ${transport.name} failed:`, error);
      }
    }

    if (promises.length > 0) {
      try {
        await Promise.allSettled(promises);
      } catch (error) {
        console.error("One or more transports failed:", error);
      }
    }
  }

  private async logEntry(level: LogLevel, args: unknown[], additionalContext?: LogContext) {
    if (!this.shouldLog(level) || !this.shouldSample()) {
      return;
    }

    const entry = this.createLogEntry(level, args, additionalContext);

    if (this.enableBuffering) {
      this.buffer.push(entry);
      if (this.buffer.length >= this.bufferSize) {
        await this.flush();
      }
    } else {
      await this.writeToTransports(entry);
    }
  }

  async flush() {
    if (this.buffer.length === 0) return;

    const entries = [...this.buffer];
    this.buffer = [];

    for (const entry of entries) {
      await this.writeToTransports(entry);
    }
  }

  // Core logging methods
  debug(...args: unknown[]) {
    return this.logEntry("debug", args);
  }

  info(...args: unknown[]) {
    return this.logEntry("info", args);
  }

  warn(...args: unknown[]) {
    return this.logEntry("warn", args);
  }

  error(...args: unknown[]) {
    return this.logEntry("error", args);
  }

  // Context-aware logging methods
  withContext(context: LogContext) {
    return new Logger({
      level: this.level,
      json: this.json,
      enablePerformanceTracking: this.enablePerformanceTracking,
      enableBuffering: this.enableBuffering,
      bufferSize: this.bufferSize,
      flushInterval: this.flushInterval,
      includeStackTrace: this.includeStackTrace,
      maxStackTraceLines: this.maxStackTraceLines,
      enableSampling: this.enableSampling,
      sampleRate: this.sampleRate,
      context: { ...this.context, ...context },
      transports: this.transports,
    });
  }

  // Performance tracking methods
  startTimer(operation: string): void {
    if (this.enablePerformanceTracking) {
      this.performanceTimers.set(operation, Date.now());
    }
  }

  endTimer(operation: string, ...args: unknown[]): void {
    if (this.enablePerformanceTracking) {
      const startTime = this.performanceTimers.get(operation);
      if (startTime) {
        const duration = Date.now() - startTime;
        this.performanceTimers.delete(operation);
        this.info(`${operation} completed`, ...args, { duration, operation });
      }
    }
  }

  // Utility methods for common patterns
  request(method: string, url: string, statusCode?: number, duration?: number, ...args: unknown[]) {
    return this.logEntry("info", args, { method, url, statusCode, duration });
  }

  apiCall(
    endpoint: string,
    method: string,
    statusCode?: number,
    duration?: number,
    ...args: unknown[]
  ) {
    return this.logEntry("info", [`API ${method} ${endpoint}`], {
      method,
      url: endpoint,
      statusCode,
      duration,
      ...args,
    });
  }

  userAction(action: string, userId?: string, ...args: unknown[]) {
    return this.logEntry("info", [`User action: ${action}`], {
      userId,
      component: "user-action",
      ...args,
    });
  }

  security(event: string, userId?: string, ip?: string, ...args: unknown[]) {
    return this.logEntry("warn", [`Security event: ${event}`], {
      userId,
      ip,
      component: "security",
      ...args,
    });
  }

  // Cleanup method
  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    return this.flush();
  }
}

// Default logger instance with production-ready configuration
export const logger = new Logger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  json: process.env.NODE_ENV === "production",
  enablePerformanceTracking: process.env.NODE_ENV !== "production",
  includeStackTrace: true,
  maxStackTraceLines: 10,
  enableSampling: process.env.NODE_ENV === "production",
  sampleRate: 0.1, // 10% sampling in production
  context: {
    service: "next-tailwind-ts-starter",
    version: process.env.npm_package_version || "unknown",
  },
});

// Create specialized loggers for different parts of your application
export const apiLogger = logger.withContext({ component: "api" });
export const authLogger = logger.withContext({ component: "auth" });
export const dbLogger = logger.withContext({ component: "database" });

// Graceful shutdown handler
if (typeof process !== "undefined") {
  process.on("SIGINT", async () => {
    await logger.destroy();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await logger.destroy();
    process.exit(0);
  });
}

/*
 * USAGE EXAMPLES:
 *
 * // Basic logging
 * import { logger } from "@/lib/logger";
 *
 * logger.debug("Debugging details", { data: 123 });
 * logger.info("User logged in", { userId: 42 });
 * logger.warn("API response slow", { endpoint: "/api/users", duration: 1500 });
 * logger.error("Database connection failed!", new Error("Connection timeout"));
 *
 * // Context-aware logging
 * const requestLogger = logger.withContext({
 *   requestId: "req_123",
 *   userId: "user_456"
 * });
 * requestLogger.info("Processing user request");
 *
 * // Performance tracking
 * logger.startTimer("database-query");
 * // ... some operation
 * logger.endTimer("database-query", "Fetched user data");
 *
 * // Specialized logging methods
 * logger.request("GET", "/api/users", 200, 125);
 * logger.apiCall("/api/users", "GET", 200, 125, { count: 10 });
 * logger.userAction("login", "user_123", { method: "oauth" });
 * logger.security("failed-login-attempt", "user_123", "192.168.1.1");
 *
 * // Using specialized loggers
 * import { apiLogger, authLogger } from "@/lib/logger";
 *
 * apiLogger.info("API request processed", { endpoint: "/users" });
 * authLogger.warn("Invalid token provided", { token: "****" });
 *
 * // Error handling with proper serialization
 * try {
 *   throw new Error("Something went wrong");
 * } catch (error) {
 *   logger.error("Operation failed", error, { operation: "user-update" });
 * }
 *
 * // Custom transport example (for external logging services)
 * const customLogger = new Logger({
 *   transports: [
 *     {
 *       name: "external-service",
 *       log: async (entry) => {
 *         // Send to external logging service
 *         await fetch("https://logs.example.com/ingest", {
 *           method: "POST",
 *           headers: { "Content-Type": "application/json" },
 *           body: JSON.stringify(entry),
 *         });
 *       },
 *       level: "warn", // Only send warnings and errors to external service
 *     }
 *   ]
 * });
 */
