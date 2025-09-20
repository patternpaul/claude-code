# Roman Numerals Converter

## ⚠️ CURRENT STATE: NO CODE EXISTS YET
- **Implementation Status:** 0% - No files created
- **Required Directories:** src/, test/ (must be created)
- **Next Action:** Task 1 in TODO.md - Create test infrastructure
- **Validation After Task 1:** `npm test` should show 7 passing tests

## Target Architecture (TO BE CREATED)

### Directory Creation Commands
```bash
# Run these first:
mkdir -p src/roman-numerals/domain
mkdir -p test/roman-numerals
```

### File Structure and Exports
```
src/
├── index.ts                    # Main entry: export function romanToNumber(input: string): number
└── roman-numerals/
    ├── domain/
    │   └── roman-converter.ts  # Core logic: export function convert(roman: string): number
    ├── types.ts                # Error class: export class InvalidRomanNumeralError extends Error
    └── validation.ts           # Validator: export function validateRomanNumeral(input: string): void

test/
└── roman-numerals/
    └── roman-converter.test.ts # Tests: import { test } from 'uvu'; import * as assert from 'uvu/assert'
```

## Implementation Patterns (COPY-PASTE READY)

### File Creation Order
1. `test/roman-numerals/roman-converter.test.ts` - Write failing tests first
2. `src/roman-numerals/types.ts` - Error class definition
3. `src/roman-numerals/domain/roman-converter.ts` - Core conversion logic
4. `src/index.ts` - Public API wrapper
5. `src/roman-numerals/validation.ts` - Input validation (Task 4)

### Symbol Mapping for roman-converter.ts
```typescript
const symbolValues = new Map<string, number>([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000]
]);

const subtractivePatterns = new Map<string, number>([
  ['IV', 4],
  ['IX', 9],
  ['XL', 40],
  ['XC', 90],
  ['CD', 400],
  ['CM', 900]
]);
```

### Error Class Pattern
```typescript
export class InvalidRomanNumeralError extends Error {
  constructor(input: string, reason: string) {
    super(`Invalid roman numeral "${input}": ${reason}`);
    this.name = 'InvalidRomanNumeralError';
  }
}
```

### Test Pattern (uvu)
```typescript
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { romanToNumber } from '../../src/index';

test('single symbol I', () => {
  assert.is(romanToNumber('I'), 1);
});
```

### Complete Conversion Algorithm (Task 3 implementation)
```typescript
export function convert(roman: string): number {
  let result = 0;
  let i = 0;
  
  while (i < roman.length) {
    // Check two-character pattern first (add in Task 3)
    if (i + 1 < roman.length) {
      const twoChar = roman.substring(i, i + 2);
      if (subtractivePatterns.has(twoChar)) {
        result += subtractivePatterns.get(twoChar)!;
        i += 2;
        continue;
      }
    }
    
    // Single character (implement in Task 1, works for Task 2 as well)
    const oneChar = roman[i];
    if (!symbolValues.has(oneChar)) {
      throw new InvalidRomanNumeralError(roman, `Invalid character '${oneChar}'`);
    }
    result += symbolValues.get(oneChar)!;
    i++;
  }
  
  return result;
}
```

### Main Export Pattern for src/index.ts
```typescript
import { convert } from './roman-numerals/domain/roman-converter';
import { validateRomanNumeral } from './roman-numerals/validation'; // Add in Task 4

export function romanToNumber(input: string): number {
  const normalized = input.toUpperCase(); // Add in Task 4
  validateRomanNumeral(normalized); // Add in Task 4
  return convert(normalized); // Just convert(input) for Tasks 1-3
}
```

## Validation Implementation (Task 4)
```typescript
// src/roman-numerals/validation.ts
export function validateRomanNumeral(input: string): void {
  if (!input) {
    throw new InvalidRomanNumeralError(input, 'Empty input');
  }
  
  // Valid chars only
  if (!/^[IVXLCDM]+$/.test(input)) {
    throw new InvalidRomanNumeralError(input, 'Contains invalid characters');
  }
  
  // No 4+ consecutive same symbols
  if (/(I{4,}|X{4,}|C{4,}|M{4,})/.test(input)) {
    throw new InvalidRomanNumeralError(input, 'Invalid sequence: too many consecutive symbols');
  }
  
  // No doubles of V, L, D
  if (/(VV|LL|DD)/.test(input)) {
    throw new InvalidRomanNumeralError(input, 'Invalid sequence: V, L, D cannot be repeated');
  }
}
```

## Test Coverage by Task

### Task 1: Single Symbols (7 tests)
- I → 1, V → 5, X → 10, L → 50, C → 100, D → 500, M → 1000

### Task 2: Additive Notation (10 tests)
- II → 2, III → 3, VI → 6, VII → 7, VIII → 8
- XI → 11, XV → 15, XX → 20, XXX → 30, LX → 60

### Task 3: Subtractive & Complex (11 tests)
- IV → 4, IX → 9, XL → 40, XC → 90, CD → 400, CM → 900
- XIV → 14, XLII → 42, MCMXCIV → 1994, MMXXIII → 2023, MMMCMXCIX → 3999

### Task 4: Error Handling (4+ tests)
- "" → InvalidRomanNumeralError
- "ABC" → InvalidRomanNumeralError
- "IIII" → InvalidRomanNumeralError
- "xiv" → 14 (lowercase handling)

## Implementation Constraints

### Required Patterns
- **Test Framework:** uvu only (`import { test } from 'uvu'`)
- **Assertions:** `import * as assert from 'uvu/assert'`
- **TypeScript:** Strict mode, explicit return types required
- **Main Export:** Must be `romanToNumber` in src/index.ts
- **Error Class:** Must extend Error with proper name property
- **No External Libraries:** Build from scratch, no roman numeral packages

### Validation Commands After Each Task
- **After any task:** `npm test` - All implemented tests must pass
- **Before commit:** `npm run lint` - Must have zero errors
- **Final check:** `npm run test:ts` - TypeScript must compile cleanly

## Quick Test: Implementation Working?
```typescript
// If implementation is complete, this should work:
import { romanToNumber } from './src/index';
console.log(romanToNumber('MCMXCIV')); // Should output: 1994
```