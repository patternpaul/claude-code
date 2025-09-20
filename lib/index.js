"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  romanToNumber: () => romanToNumber
});
module.exports = __toCommonJS(index_exports);

// src/roman-numerals/types.ts
var InvalidRomanNumeralError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidRomanNumeralError";
  }
};

// src/roman-numerals/validation.ts
function validateRomanNumeral(input) {
  if (input === "") {
    throw new InvalidRomanNumeralError("Empty string is not a valid Roman numeral");
  }
  const validChars = /* @__PURE__ */ new Set(["I", "V", "X", "L", "C", "D", "M"]);
  for (const char of input) {
    if (!validChars.has(char)) {
      throw new InvalidRomanNumeralError(`Invalid character '${char}' in Roman numeral`);
    }
  }
  validateConsecutiveSymbols(input);
  validateNonRepeatableSymbols(input);
}
function validateConsecutiveSymbols(input) {
  let consecutiveCount = 1;
  let previousChar = input[0];
  for (let i = 1; i < input.length; i++) {
    if (input[i] === previousChar) {
      consecutiveCount++;
      if (consecutiveCount >= 4) {
        throw new InvalidRomanNumeralError(
          `More than 3 consecutive '${previousChar}' symbols are not allowed`
        );
      }
    } else {
      consecutiveCount = 1;
      previousChar = input[i];
    }
  }
}
function validateNonRepeatableSymbols(input) {
  const nonRepeatableSymbols = ["V", "L", "D"];
  const symbolCounts = /* @__PURE__ */ new Map();
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

// src/roman-numerals/domain/roman-converter.ts
function romanToNumber(input) {
  const normalizedInput = input.toUpperCase();
  validateRomanNumeral(normalizedInput);
  const subtractivePatterns = /* @__PURE__ */ new Map([
    ["IV", 4],
    ["IX", 9],
    ["XL", 40],
    ["XC", 90],
    ["CD", 400],
    ["CM", 900]
  ]);
  const symbolValues = /* @__PURE__ */ new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1e3]
  ]);
  let total = 0;
  let i = 0;
  while (i < normalizedInput.length) {
    if (i < normalizedInput.length - 1) {
      const twoChar = normalizedInput.substring(i, i + 2);
      const subtractiveValue = subtractivePatterns.get(twoChar);
      if (subtractiveValue !== void 0) {
        total += subtractiveValue;
        i += 2;
        continue;
      }
    }
    const currentValue = symbolValues.get(normalizedInput[i]);
    if (currentValue === void 0) {
      throw new InvalidRomanNumeralError(`Invalid Roman numeral character: ${normalizedInput[i]}`);
    }
    total += currentValue;
    i++;
  }
  return total;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  romanToNumber
});
//# sourceMappingURL=index.js.map