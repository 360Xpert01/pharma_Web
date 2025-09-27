export async function tryCatch<T>(p: Promise<T>): Promise<[T | null, any]> {
  try {
    const res = await p;
    return [res, null];
  } catch (e) {
    return [null, e];
  }
}
