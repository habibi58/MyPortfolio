// Utility function to combine classnames
type ClassValue = string | undefined | null | false | Record<string, boolean>;

export function cn(...classes: ClassValue[]): string {
  return classes
    .filter((c): c is string => typeof c === 'string')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
