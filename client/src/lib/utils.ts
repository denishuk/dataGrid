import { ClassNameValue, twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}

export function defaultValueGetter<T>(row: T, path: string): unknown {
  return getNestedValue(row, path);
}

/**
 * Utility function to get a nested value from an object by path
 */
export function getNestedValue<T>(
  obj: T,
  path: string,
): unknown {
  const keys = path.split('.');

  return keys.reduce((acc: unknown, key: string) => {
    if (acc !== null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return acc;
  }, obj);
}

/**
 * Utility function to extract unique values from data for filter options
 */
export function getUniqueValues<T>(data: T[], field: keyof T): string[] {
  const values = new Set<string>();
  data.forEach(row => {
    const value = row[field];
    if (value != null) {
      values.add(String(value));
    }
  });
  return Array.from(values).sort();
}
