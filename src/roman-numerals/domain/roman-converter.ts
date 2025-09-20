import { validateRomanNumeral } from "../validation";
import { InvalidRomanNumeralError } from "../types";

export function romanToNumber(input: string): number {
  const normalizedInput = input.toUpperCase();
  validateRomanNumeral(normalizedInput);

  const subtractivePatterns = new Map<string, number>([
    ["IV", 4],
    ["IX", 9],
    ["XL", 40],
    ["XC", 90],
    ["CD", 400],
    ["CM", 900],
  ]);

  const symbolValues = new Map<string, number>([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);

  let total = 0;
  let i = 0;

  while (i < normalizedInput.length) {
    // Check for 2-character subtractive patterns first
    if (i < normalizedInput.length - 1) {
      const twoChar = normalizedInput.substring(i, i + 2);
      const subtractiveValue = subtractivePatterns.get(twoChar);

      if (subtractiveValue !== undefined) {
        total += subtractiveValue;
        i += 2;
        continue;
      }
    }

    // If no subtractive pattern, process single character
    const currentValue = symbolValues.get(normalizedInput[i]);

    if (currentValue === undefined) {
      throw new InvalidRomanNumeralError(`Invalid Roman numeral character: ${normalizedInput[i]}`);
    }

    total += currentValue;
    i++;
  }

  return total;
}
