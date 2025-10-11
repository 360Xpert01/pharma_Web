import type pino from "pino";

/**
 * Normalize pino LogEvent messages so they can be serialized for client -> server.
 */
export const formatClientLogMessage = (logEvent: pino.LogEvent): pino.LogEvent => {
  logEvent.messages = logEvent.messages.map((message) => {
    if (message && typeof message === "object" && "stack" in message) {
      // Error-like object: normalize shape
      // @ts-expect-error - pino shapes vary
      return {
        err: {
          // @ts-expect-error
          type: message.type ?? typeof message,
          // @ts-expect-error
          stack: message.stack,
          // @ts-expect-error
          message: message.msg ?? message.message ?? String(message),
        },
      };
    }
    return message;
  });

  return logEvent;
};

export const stringify = (obj: string | object): string =>
  typeof obj === "string" ? obj : String(obj);
