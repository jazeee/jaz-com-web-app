/**
 * Ensures that a value is defined. The return type is conditional to help ensure type safety.
 * This means that using the guard of `isDefined(value)` will ensure that the value is defined.
 * @param value T or null or undefined
 * @returns true if `value` is not null and not undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
