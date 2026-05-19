
// validate user ID from URL param to prevent malformed cuid from reaching the database
export function isValidCuid(id: string): boolean {
    // CUID v1 pattern: starts with 'c' and has length 25 (or 'c' + 24 alphanumeric)
    return /^c[a-z0-9]{24}$/.test(id);
  }