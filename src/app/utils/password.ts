import { contains, isAlpha, isLength, isNumeric } from "./validator";

// Constants for validation
const MIN_PASSWORD_LENGTH = 8;
const MAX_SEQUENCE_LENGTH = 4;

// Function to check sequential characters (numeric or alphabetic)
function hasSequentialCharacters(
  password: string,
  maxSeqLength: number
): boolean {
  for (let i = 0; i <= password.length - maxSeqLength; i++) {
    const currentSequence = password.slice(i, i + maxSeqLength);
    const isNumericSeq = isNumeric(currentSequence);
    const isAlphaSeq = isAlpha(currentSequence);

    if (isNumericSeq || isAlphaSeq) {
      const isAscending = currentSequence
        .split("")
        .every(
          (char, index, array) =>
            index === 0 ||
            array[index - 1].charCodeAt(0) + 1 === char.charCodeAt(0)
        );

      const isDescending = currentSequence
        .split("")
        .every(
          (char, index, array) =>
            index === 0 ||
            array[index - 1].charCodeAt(0) - 1 === char.charCodeAt(0)
        );

      if (isAscending || isDescending) {
        return true; // Found ascending or descending sequence
      }
    }
  }
  return false;
}

// Validation checks array
export const passwordValidations = (password: string = "") => [
  {
    value: isLength(password, MIN_PASSWORD_LENGTH),
    message: "Password must be at least 8 characters long",
    error: "8 characters",
  },
  {
    value: /[a-z]/.test(password),
    message: "Password must contain at least 1 lowercase letter",
    error: "1 lowercase letter",
  },
  {
    value: /[A-Z]/.test(password),
    message: "Password must contain at least 1 uppercase letter",
    error: "1 uppercase letter",
  },
  {
    value: /\d/.test(password),
    message: "Password must contain at least 1 number",
    error: "1 number",
  },
  {
    value: /[^a-zA-Z0-9]/.test(password),
    message: "Password must contain at least 1 symbol ($ @ - _ () / . ,)",
    error: "1 symbol ($ @ - _ () / . ,)",
  },
  {
    value: !contains(password, " "),
    error: "Avoid spaces",
  },
  {
    value: !/(skydropx|envíos|envios)/i.test(password),
    error: "Avoid using common words",
  },
  {
    value: !hasSequentialCharacters(password, MAX_SEQUENCE_LENGTH),
    message: "Avoid sequences (e.g., abcd - 1234)",
    error: "Avoid sequences of numbers or letters",
  },
];

// Function to validate the password and return errors or true if valid
export function passwordSubmitValidation(password: string): string | boolean {
  const errors: string[] = [
    "The password must meet the following requirements:",
  ];
  let isErrorPresent = false;

  passwordValidations(password).forEach(({ value, error }, index) => {
    if (!value) {
      isErrorPresent = true;
      if (index > 4 && errors.length === 1) {
        errors.push(" ", error);
      } else {
        errors.push(`${error},`);
      }
    }
  });

  return isErrorPresent ? errors.join(" ") : true;
}
