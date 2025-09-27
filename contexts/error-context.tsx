"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AppError, ErrorFactory, ErrorHandlerRegistry } from '@/lib/error-factory';
import { logger } from '@/lib/logger';

interface ErrorContextType {
  errors: AppError[];
  addError: (error: Error | AppError | string) => void;
  removeError: (index: number) => void;
  clearErrors: () => void;
  handleError: (error: AppError) => {
    title: string;
    description: string;
    action?: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  };
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
  maxErrors?: number;
}

export function ErrorProvider({ children, maxErrors = 5 }: ErrorProviderProps) {
  const [errors, setErrors] = useState<AppError[]>([]);
  const errorHandlerRegistry = new ErrorHandlerRegistry();

  const addError = useCallback((error: Error | AppError | string) => {
    let appError: AppError;

    if (typeof error === 'string') {
      appError = ErrorFactory.createUnknownError(error);
    } else if ('type' in error) {
      appError = error as AppError;
    } else {
      appError = ErrorFactory.fromError(error);
    }

    setErrors(prev => {
      const newErrors = [appError, ...prev].slice(0, maxErrors);
      return newErrors;
    });

    // Log error for debugging
    logger.error('Error added to application context', { 
      type: appError.type, 
      message: appError.message, 
      code: appError.code 
    });
  }, [maxErrors]);

  const removeError = useCallback((index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const handleError = useCallback((error: AppError) => {
    return errorHandlerRegistry.handle(error);
  }, [errorHandlerRegistry]);

  const value: ErrorContextType = {
    errors,
    addError,
    removeError,
    clearErrors,
    handleError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

// Hook for handling async operations with error management
export function useAsyncError() {
  const { addError } = useError();

  const executeAsync = useCallback(
    async (asyncFn: () => Promise<any>, errorMessage?: string): Promise<any> => {
      try {
        return await asyncFn();
      } catch (error) {
        const message = errorMessage || 'An error occurred during async operation';
        addError(error instanceof Error ? error : new Error(message));
        return null;
      }
    },
    [addError]
  );

  return { executeAsync };
}