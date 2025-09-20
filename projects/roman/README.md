# Roman Numerals Converter

## Current State
**STATUS:** NO CODE EXISTS YET - Starting from scratch
**Next Action:** See Task 1 in TODO.md (marked with NEXT TASK)

## Architecture Decisions

### Directory Structure Required
```
src/
├── index.ts                    # Main entry point
└── roman-numerals/
    ├── domain/
    │   └── roman-converter.ts  # Core conversion logic
    ├── types.ts                # Custom error types
    └── validation.ts           # Input validation

test/
└── roman-numerals/
    └── roman-converter.test.ts # Test suite
```

### Technical Requirements
- **Language:** TypeScript with strict mode
- **Testing:** uvu framework only (not jest or vitest)
- **Architecture:** Domain-Driven Design pattern
- **Main API:** `romanToNumber(input: string): number` exported from src/index.ts
- **Error Handling:** Custom `InvalidRomanNumeralError` class extending Error
- **No External Libraries:** Build conversion logic from scratch

## Roman Numeral Rules

### Basic Symbols
- I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000

### Additive Notation
- Symbols add when right symbol is less than or equal to left (e.g., VI = 6, III = 3)

### Subtractive Notation
- I before V or X subtracts 1 (IV = 4, IX = 9)
- X before L or C subtracts 10 (XL = 40, XC = 90)
- C before D or M subtracts 100 (CD = 400, CM = 900)

### Validation Rules
- No more than 3 consecutive identical symbols (except M)
- V, L, D cannot be repeated
- Only valid characters: I, V, X, L, C, D, M
- Empty string should throw error
- Case insensitive (handle lowercase input)

## Test Requirements
- Use `import { test } from 'uvu'` and `import * as assert from 'uvu/assert'`
- Test file must end with `test.run()`
- Each task defines expected test count that must pass

## Validation Commands
- `npm test` - Run all tests
- `npm run lint` - Check code style (must have 0 errors)
- `npm run test:ts` - Verify TypeScript compilation