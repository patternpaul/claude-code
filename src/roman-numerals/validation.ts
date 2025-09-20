import { InvalidRomanNumeralError } from "./types";

/**
 * Validates a Roman numeral string according to standard rules.
 *
 * @param input - The Roman numeral string to validate (must be uppercase)
 * @throws {InvalidRomanNumeralError} When validation fails
 */
export function validateRomanNumeral(input: string): void {
  if (input === "") {
    throw new InvalidRomanNumeralError("Empty string is not a valid Roman numeral");
  }

  const validChars = new Set(["I", "V", "X", "L", "C", "D", "M"]);

  for (const char of input) {
    if (!validChars.has(char)) {
      throw new InvalidRomanNumeralError(`Invalid character '${char}' in Roman numeral`);
    }
  }

  validateConsecutiveSymbols(input);
  validateNonRepeatableSymbols(input);
}

function validateConsecutiveSymbols(input: string): void {
  let consecutiveCount = 1;
  let previousChar = input[0];

  for (let i = 1; i < input.length; i++) {
    if (input[i] === previousChar) {
      consecutiveCount++;
      if (consecutiveCount >= 4) {
        throw new InvalidRomanNumeralError(
          `More than 3 consecutive '${previousChar}' symbols are not allowed`,
        );
      }
    } else {
      consecutiveCount = 1;
      previousChar = input[i];
    }
  }
}

function validateNonRepeatableSymbols(input: string): void {
  const nonRepeatableSymbols = ["V", "L", "D"];
  const symbolCounts = new Map<string, number>();

  for (const char of input) {
    symbolCounts.set(char, (symbolCounts.get(char) || 0) + 1);
  }

  for (const symbol of nonRepeatableSymbols) {
    const count = symbolCounts.get(symbol) || 0;
    if (count > 1) {
      throw new InvalidRomanNumeralError(`Symbol '${symbol}' cannot be repeated`);
    }
  }
}
