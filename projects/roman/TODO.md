# Roman Numerals - 2025-09-20

## Goals

- [ ] Create TypeScript roman numeral to number converter with full test coverage
  - [ ] Task 1: Test infrastructure and single symbols (NEXT TASK)
    - Create test/roman-numerals/roman-converter.test.ts with uvu imports
    - Write tests for all single symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000
    - Create src/roman-numerals/types.ts with InvalidRomanNumeralError class
    - Create src/roman-numerals/domain/roman-converter.ts with symbolValues Map
    - Implement convert() function for single symbols only
    - Create src/index.ts with romanToNumber() that calls convert()
    - **Validation:** `npm test` shows 7 passing tests (one per symbol)
    - **Checkpoint:** All single symbol conversions working
  - [ ] Task 2: Additive notation support
    - Add tests: II=2, III=3, VI=6, VII=7, VIII=8, XI=11, XV=15, XX=20, XXX=30, LX=60
    - Update convert() to sum multiple symbols left-to-right
    - **Test cases to add:**
      ```typescript
      test('additive II', () => assert.is(romanToNumber('II'), 2));
      test('additive III', () => assert.is(romanToNumber('III'), 3));
      test('additive VI', () => assert.is(romanToNumber('VI'), 6));
      test('additive VII', () => assert.is(romanToNumber('VII'), 7));
      test('additive VIII', () => assert.is(romanToNumber('VIII'), 8));
      test('additive XI', () => assert.is(romanToNumber('XI'), 11));
      test('additive XV', () => assert.is(romanToNumber('XV'), 15));
      test('additive XX', () => assert.is(romanToNumber('XX'), 20));
      test('additive XXX', () => assert.is(romanToNumber('XXX'), 30));
      test('additive LX', () => assert.is(romanToNumber('LX'), 60));
      ```
    - **Validation:** `npm test` shows 17 passing tests total
    - **Checkpoint:** Simple addition working correctly
  - [ ] Task 3: Subtractive notation and complex numbers
    - Add subtractivePatterns Map to roman-converter.ts (IV=4, IX=9, XL=40, XC=90, CD=400, CM=900)
    - Implement two-character lookahead in convert() function
    - Add tests for all subtractive patterns
    - Add complex number tests: XIV=14, XLII=42, MCMXCIV=1994, MMXXIII=2023, MMMCMXCIX=3999
    - **Test cases to add:**
      ```typescript
      test('subtractive IV', () => assert.is(romanToNumber('IV'), 4));
      test('subtractive IX', () => assert.is(romanToNumber('IX'), 9));
      test('subtractive XL', () => assert.is(romanToNumber('XL'), 40));
      test('subtractive XC', () => assert.is(romanToNumber('XC'), 90));
      test('subtractive CD', () => assert.is(romanToNumber('CD'), 400));
      test('subtractive CM', () => assert.is(romanToNumber('CM'), 900));
      test('complex XIV', () => assert.is(romanToNumber('XIV'), 14));
      test('complex XLII', () => assert.is(romanToNumber('XLII'), 42));
      test('complex MCMXCIV', () => assert.is(romanToNumber('MCMXCIV'), 1994));
      test('complex MMXXIII', () => assert.is(romanToNumber('MMXXIII'), 2023));
      test('complex MMMCMXCIX', () => assert.is(romanToNumber('MMMCMXCIX'), 3999));
      ```
    - **Validation:** `npm test` shows 28+ passing tests
    - **Checkpoint:** Full conversion algorithm complete
  - [ ] Task 4: Input validation and error handling
    - Create src/roman-numerals/validation.ts with validateRomanNumeral()
    - Add validation checks: empty string, invalid chars, IIII, VV, LL, DD
    - Update romanToNumber() to validate before converting
    - Add lowercase to uppercase conversion in romanToNumber()
    - Add error tests:
      ```typescript
      test('throws on empty string', () => {
        assert.throws(() => romanToNumber(''), /Invalid roman numeral/);
      });
      test('throws on invalid chars', () => {
        assert.throws(() => romanToNumber('ABC'), /Invalid character/);
      });
      test('throws on IIII', () => {
        assert.throws(() => romanToNumber('IIII'), /Invalid sequence/);
      });
      test('handles lowercase', () => {
        assert.is(romanToNumber('xiv'), 14);
      });
      ```
    - **Validation:** `npm test` all pass, `npm run lint` clean, `npm run test:ts` passes
    - **Checkpoint:** Complete implementation with validation
  - [ ] Task 5: Final quality check
    - Run `npm run lint` and fix any issues
    - Run `npm run test:ts` for TypeScript checking
    - Run `npm test` to verify 100% test pass rate
    - Verify all exports are typed correctly
    - **Success criteria:** 
      - Zero lint errors
      - Zero TypeScript errors
      - All tests passing (30+ tests)
      - romanToNumber('MCMXCIV') returns 1994
      - romanToNumber('') throws InvalidRomanNumeralError

## Technical Context

- **Framework:** Node.js with TypeScript strict mode
- **Test runner:** uvu (not jest) - import { test } from 'uvu'
- **Pattern:** TDD - write failing test first, then implement
- **Architecture:** Domain-driven with types.ts, validation.ts, roman-converter.ts
- **Key constraint:** No external roman numeral libraries

## Implementation Order Rationale

1. Single symbols first - establishes basic Map structure and test pattern
2. Additive notation - extends algorithm without breaking existing tests  
3. Subtractive notation - adds complexity while maintaining all previous tests
4. Validation last - easier to test core logic without validation interference
5. Each task ends with all tests passing - no broken state between tasks