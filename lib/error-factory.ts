// Error Factory Pattern for consistent error handling
export interface BaseError {
  name: string;
  message: string;
  code?: string;
  statusCode?: number;
  timestamp: Date;
  stack?: string;
}

export interface NetworkError extends BaseError {
  type: 'network';
  url?: string;
  method?: string;
  timeout?: boolean;
}

export interface ValidationError extends BaseError {
  type: 'validation';
  field?: string;
  value?: any;
}

export interface NotFoundError extends BaseError {
  type: 'not-found';
  resource?: string;
}

export interface ServerError extends BaseError {
  type: 'server';
  statusCode: number;
  details?: any;
}

export interface UnknownError extends BaseError {
  type: 'unknown';
  originalError?: Error;
}

export type AppError = NetworkError | ValidationError | NotFoundError | ServerError | UnknownError;

// Error Factory
export class ErrorFactory {
  private static createBaseError(message: string, name: string): BaseError {
    return {
      name,
      message,
      timestamp: new Date(),
      stack: new Error().stack
    };
  }

  static createNetworkError(
    message: string, 
    options: { url?: string; method?: string; timeout?: boolean; code?: string } = {}
  ): NetworkError {
    return {
      ...this.createBaseError(message, 'NetworkError'),
      type: 'network',
      code: options.code || 'NETWORK_ERROR',
      ...options
    };
  }

  static createValidationError(
    message: string,
    field?: string,
    value?: any,
    code?: string
  ): ValidationError {
    return {
      ...this.createBaseError(message, 'ValidationError'),
      type: 'validation',
      field,
      value,
      code: code || 'VALIDATION_ERROR'
    };
  }

  static createNotFoundError(
    message: string,
    resource?: string,
    code?: string
  ): NotFoundError {
    return {
      ...this.createBaseError(message, 'NotFoundError'),
      type: 'not-found',
      resource,
      code: code || 'NOT_FOUND',
      statusCode: 404
    };
  }

  static createServerError(
    message: string,
    statusCode: number,
    details?: any,
    code?: string
  ): ServerError {
    return {
      ...this.createBaseError(message, 'ServerError'),
      type: 'server',
      statusCode,
      details,
      code: code || 'SERVER_ERROR'
    };
  }

  static createUnknownError(
    message: string,
    originalError?: Error,
    code?: string
  ): UnknownError {
    return {
      ...this.createBaseError(message, 'UnknownError'),
      type: 'unknown',
      originalError,
      code: code || 'UNKNOWN_ERROR'
    };
  }

  // Parse and categorize errors from various sources
  static fromError(error: Error | any): AppError {
    if (error?.response?.status) {
      // HTTP errors
      const status = error.response.status;
      if (status === 404) {
        return this.createNotFoundError(
          error.message || 'Resource not found',
          error.response.config?.url
        );
      } else if (status >= 500) {
        return this.createServerError(
          error.message || 'Server error',
          status,
          error.response.data
        );
      } else if (status >= 400) {
        return this.createValidationError(error.message || 'Client error');
      }
    }

    if (error?.code === 'NETWORK_ERROR' || error?.name === 'NetworkError') {
      return this.createNetworkError(
        error.message || 'Network connection failed',
        { 
          url: error.config?.url,
          method: error.config?.method,
          timeout: error.code === 'ECONNABORTED'
        }
      );
    }

    return this.createUnknownError(
      error?.message || 'An unexpected error occurred',
      error
    );
  }
}

// Error Handler Strategy Pattern
export interface ErrorHandler {
  canHandle(error: AppError): boolean;
  handle(error: AppError): {
    title: string;
    description: string;
    action?: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  };
}

export class NetworkErrorHandler implements ErrorHandler {
  canHandle(error: AppError): boolean {
    return error.type === 'network';
  }

  handle(error: NetworkError) {
    if (error.timeout) {
      return {
        title: 'Connection Timeout',
        description: 'The request took too long to complete. Please check your internet connection.',
        action: 'Retry',
        severity: 'medium' as const
      };
    }

    return {
      title: 'Network Error',
      description: 'Unable to connect to the server. Please check your internet connection.',
      action: 'Retry',
      severity: 'high' as const
    };
  }
}

export class NotFoundErrorHandler implements ErrorHandler {
  canHandle(error: AppError): boolean {
    return error.type === 'not-found';
  }

  handle(error: NotFoundError) {
    return {
      title: 'Page Not Found',
      description: `The ${error.resource || 'page'} you're looking for doesn't exist.`,
      action: 'Go Home',
      severity: 'low' as const
    };
  }
}

export class ValidationErrorHandler implements ErrorHandler {
  canHandle(error: AppError): boolean {
    return error.type === 'validation';
  }

  handle(error: ValidationError) {
    return {
      title: 'Validation Error',
      description: error.field 
        ? `Invalid value for ${error.field}: ${error.message}`
        : error.message,
      severity: 'medium' as const
    };
  }
}

export class ServerErrorHandler implements ErrorHandler {
  canHandle(error: AppError): boolean {
    return error.type === 'server';
  }

  handle(error: ServerError) {
    return {
      title: 'Server Error',
      description: 'Something went wrong on our end. Please try again later.',
      action: 'Retry',
      severity: 'critical' as const
    };
  }
}

export class UnknownErrorHandler implements ErrorHandler {
  canHandle(error: AppError): boolean {
    return error.type === 'unknown';
  }

  handle(error: UnknownError) {
    return {
      title: 'Unexpected Error',
      description: 'Something unexpected happened. Please try again.',
      action: 'Retry',
      severity: 'high' as const
    };
  }
}

// Error Handler Registry
export class ErrorHandlerRegistry {
  private handlers: ErrorHandler[] = [
    new NetworkErrorHandler(),
    new NotFoundErrorHandler(),
    new ValidationErrorHandler(),
    new ServerErrorHandler(),
    new UnknownErrorHandler()
  ];

  handle(error: AppError) {
    const handler = this.handlers.find(h => h.canHandle(error));
    return handler?.handle(error) || {
      title: 'Error',
      description: 'An error occurred',
      severity: 'medium' as const
    };
  }

  addHandler(handler: ErrorHandler) {
    this.handlers.unshift(handler); // Add at beginning for priority
  }
}