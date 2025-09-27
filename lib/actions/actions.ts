// ============================
// ERROR HANDLING UTILITIES
// ============================

export async function tryCatch<T>(p: Promise<T>): Promise<[T | null, any]> {
  try {
    const res = await p;
    return [res, null];
  } catch (e) {
    return [null, e];
  }
}

export function safeExecute<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

// ============================
// DATA PARSING UTILITIES
// ============================

export function safeJsonParse<T = unknown>(str: string | null | undefined, fallback: T): T {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

export function safeJsonStringify(obj: any, fallback: string = '{}'): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return fallback;
  }
}

// ============================
// ASYNC UTILITIES
// ============================

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

// ============================
// STORAGE UTILITIES
// ============================

export const storage = {
  get: (key: string) => (typeof window !== "undefined" ? window.localStorage.getItem(key) : null),
  set: (key: string, value: string) =>
    typeof window !== "undefined" ? window.localStorage.setItem(key, value) : undefined,
  remove: (key: string) =>
    typeof window !== "undefined" ? window.localStorage.removeItem(key) : undefined,
  getJson: <T>(key: string, fallback: T): T => {
    const item = storage.get(key);
    return safeJsonParse(item, fallback);
  },
  setJson: (key: string, value: any): void => {
    const jsonString = safeJsonStringify(value);
    storage.set(key, jsonString);
  },
};

// ============================
// VALIDATION UTILITIES
// ============================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string, minLength: number = 6): boolean {
  return password.length >= minLength;
}

export function isNotEmpty(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

// ============================
// FORM UTILITIES
// ============================

export function getFormErrorMessage(error: any): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  return 'Invalid input';
}

export function formatFormErrors(errors: Record<string, any>): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  for (const [key, error] of Object.entries(errors)) {
    formattedErrors[key] = getFormErrorMessage(error);
  }
  return formattedErrors;
}

// ============================
// DATE/TIME UTILITIES
// ============================

export function formatDate(date: Date | string | number, format: 'short' | 'long' | 'datetime' = 'short'): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString();
    case 'long':
      return d.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'datetime':
      return d.toLocaleString();
    default:
      return d.toLocaleDateString();
  }
}

export function isValidDate(date: any): boolean {
  const d = new Date(date);
  return !isNaN(d.getTime());
}

// ============================
// STRING UTILITIES
// ============================

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + suffix;
}

// ============================
// ARRAY UTILITIES
// ============================

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// ============================
// NUMBER UTILITIES
// ============================

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return Number(num).toFixed(decimals);
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

// ============================
// OBJECT UTILITIES
// ============================

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as T;
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

// ============================
// URL/NETWORK UTILITIES
// ============================

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  }
  return searchParams.toString();
}

// ============================
// API/HTTP UTILITIES
// ============================

export interface ApiResponse<T = any> {
  data: T;
  error?: { message: string; code?: string };
  success: boolean;
}

export function createApiResponse<T>(data: T, error?: { message: string; code?: string }): ApiResponse<T> {
  return {
    data,
    error,
    success: !error
  };
}

export function handleApiError(error: any): { message: string; code?: string } {
  if (error?.response?.data?.message) {
    return { message: error.response.data.message, code: error.response.data.code };
  }
  if (error?.message) {
    return { message: error.message };
  }
  return { message: 'An unexpected error occurred' };
}

export async function withApiErrorHandling<T>(
  apiCall: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const data = await apiCall();
    return createApiResponse(data);
  } catch (error) {
    return createApiResponse(null as T, handleApiError(error));
  }
}

// ============================
// COMMON LOADING HELPER
// ============================

export async function withLoadingState<T>(
  asyncFn: () => Promise<T>,
  setLoading: (loading: boolean) => void,
  minDuration: number = 300
): Promise<T> {
  setLoading(true);
  try {
    const [result] = await Promise.all([
      asyncFn(),
      sleep(minDuration) // Minimum loading duration for better UX
    ]);
    return result;
  } finally {
    setLoading(false);
  }
}

// ============================
// BROWSER UTILITIES
// ============================

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isClient(): boolean {
  return isBrowser();
}

export function isServer(): boolean {
  return !isBrowser();
}

export function getViewportSize(): { width: number; height: number } {
  if (!isBrowser()) {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

// ============================
// EVENT UTILITIES
// ============================

export function createEventEmitter<T extends Record<string, any>>() {
  const listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};

  return {
    on<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event]!.push(callback);
    },

    off<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
      if (listeners[event]) {
        const index = listeners[event]!.indexOf(callback);
        if (index > -1) {
          listeners[event]!.splice(index, 1);
        }
      }
    },

    emit<K extends keyof T>(event: K, data: T[K]) {
      if (listeners[event]) {
        listeners[event]!.forEach(callback => callback(data));
      }
    }
  };
}


