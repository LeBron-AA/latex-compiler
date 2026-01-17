/* Makes the filter options more aesthetic */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* Checks if a certain string is blank */
export function isBlank(str : string) {
    return !str || str.trim().length === 0
}