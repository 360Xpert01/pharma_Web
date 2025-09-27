"use client";
import { useState, useCallback } from 'react';
import { LOADING_CONFIG, getLoadingMessage, type LoadingContext } from '@/constants/loading';
import { useError } from '@/contexts/error-context';

interface UseLoadingStateOptions {
  context?: LoadingContext;
  duration?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface LoadingState {
  isLoading: boolean;
  message: string;
  progress?: number;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { context = 'DEFAULT', duration = LOADING_CONFIG.DURATIONS.NORMAL } = options;
  const { addError } = useError();
  
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    message: getLoadingMessage(context)
  });

  const startLoading = useCallback((customMessage?: string) => {
    setState({
      isLoading: true,
      message: customMessage || getLoadingMessage(context),
      progress: 0
    });
  }, [context]);

  const updateProgress = useCallback((progress: number) => {
    setState(prev => ({
      ...prev,
      progress: Math.max(0, Math.min(100, progress))
    }));
  }, []);

  const updateMessage = useCallback((message: string) => {
    setState(prev => ({
      ...prev,
      message
    }));
  }, []);

  const stopLoading = useCallback(() => {
    setState({
      isLoading: false,
      message: getLoadingMessage(context),
      progress: undefined
    });
  }, [context]);

  const executeWithLoading = useCallback(async (
    asyncOperation: () => Promise<any>,
    customMessage?: string
  ): Promise<any> => {
    try {
      startLoading(customMessage);
      
      // Simulate minimum loading time for better UX
      const [result] = await Promise.all([
        asyncOperation(),
        import('@/lib/actions/actions').then(({ sleep }) => sleep(300)) // Minimum 300ms
      ]);
      
      options.onSuccess?.();
      return result;
    } catch (error) {
      const errorInstance = error instanceof Error ? error : new Error('Unknown error');
      addError(errorInstance);
      options.onError?.(errorInstance);
      return null;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, addError, options]);

  const executeWithProgressTracking = useCallback(async (
    asyncOperation: (updateProgress: (progress: number) => void) => Promise<any>,
    customMessage?: string
  ): Promise<any> => {
    try {
      startLoading(customMessage);
      
      const result = await asyncOperation(updateProgress);
      
      options.onSuccess?.();
      return result;
    } catch (error) {
      const errorInstance = error instanceof Error ? error : new Error('Unknown error');
      addError(errorInstance);
      options.onError?.(errorInstance);
      return null;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, updateProgress, addError, options]);

  return {
    ...state,
    startLoading,
    stopLoading,
    updateProgress,
    updateMessage,
    executeWithLoading,
    executeWithProgressTracking
  };
}

// Specialized hooks for common use cases
export function useDashboardLoading() {
  return useLoadingState({ context: 'DASHBOARD' });
}

export function useFormLoading() {
  return useLoadingState({ 
    context: 'SAVE',
    duration: LOADING_CONFIG.DURATIONS.NORMAL 
  });
}

export function useUploadLoading() {
  return useLoadingState({ 
    context: 'UPLOAD',
    duration: LOADING_CONFIG.DURATIONS.SLOW 
  });
}

export function useAuthLoading() {
  return useLoadingState({ 
    context: 'AUTH',
    duration: LOADING_CONFIG.DURATIONS.NORMAL 
  });
}

export function useDataLoading() {
  return useLoadingState({ 
    context: 'DATA',
    duration: LOADING_CONFIG.DURATIONS.QUICK 
  });
}