export const storage = {
  get: (key: string) => (typeof window !== "undefined" ? window.localStorage.getItem(key) : null),
  set: (key: string, value: string) =>
    typeof window !== "undefined" ? window.localStorage.setItem(key, value) : undefined,
  remove: (key: string) =>
    typeof window !== "undefined" ? window.localStorage.removeItem(key) : undefined,
};
