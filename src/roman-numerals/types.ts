export class InvalidRomanNumeralError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRomanNumeralError";
  }
}
