import validator from "validator";

export function isEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function isPhone(number: string): boolean {
  return validator.isMobilePhone(number, "en-CA");
}

// Custom function to check if a string is numeric
export function isNumeric(value: string): boolean {
  return validator.isNumeric(value);
}

// Custom function to check if a string contains only alphabetic characters
export function isAlpha(value: string): boolean {
  return validator.isAlpha(value);
}

// Custom function to check if a string contains spaces
export function contains(value: string, contains: string): boolean {
  return validator.contains(value, contains);
}

// Custom function to check if a string meets a minimum length
export function isLength(value: string, min: number): boolean {
  return validator.isLength(value, { min });
}
