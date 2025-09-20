# Roman Numerals - 2025-09-20

## Project Context
- **Current State:** NO CODE EXISTS - Starting from scratch
- **Location:** /Users/pauleverton/code/personal/claude-code/
- **Commands:** Run all commands from project root
- **Test Command:** `npm test` (will fail until implementation starts)

## Goals

- [ ] Create TypeScript roman numeral to number converter with full test coverage
  - [ ] Task 1: Test infrastructure and single symbols (NEXT TASK)
    - **Step 1.1:** Create directories
      ```bash
      mkdir -p src/roman-numerals/domain
      mkdir -p test/roman-numerals
      ```
    - **Step 1.2:** Create test file `test/roman-numerals/roman-converter.test.ts`
      ```typescript
      import { test } from 'uvu';
      import * as assert from 'uvu/assert';
      import { romanToNumber } from '../../src/index';
      
      test('single symbol I', () => assert.is(romanToNumber('I'), 1));
      test('single symbol V', () => assert.is(romanToNumber('V'), 5));
      test('single symbol X', () => assert.is(romanToNumber('X'), 10));
      test('single symbol L', () => assert.is(romanToNumber('L'), 50));
      test('single symbol C', () => assert.is(romanToNumber('C'), 100));
      test('single symbol D', () => assert.is(romanToNumber('D'), 500));
      test('single symbol M', () => assert.is(romanToNumber('M'), 1000));
      
      test.run();
      ```
    - **Step 1.3:** Create types `src/roman-numerals/types.ts`
      ```typescript
      export class InvalidRomanNumeralError extends Error {
        constructor(input: string, reason: string) {
          super(`Invalid roman numeral "${input}": ${reason}`);
          this.name = 'InvalidRomanNumeralError';
        }
      }
      ```
    - **Step 1.4:** Create converter `src/roman-numerals/domain/roman-converter.ts`
      ```typescript
      import { InvalidRomanNumeralError } from '../types';
      
      const symbolValues = new Map<string, number>([
        ['I', 1], ['V', 5], ['X', 10], ['L', 50], 
        ['C', 100], ['D', 500], ['M', 1000]
      ]);
      
      export function convert(roman: string): number {
        let result = 0;
        for (let i = 0; i < roman.length; i++) {
          const value = symbolValues.get(roman[i]);
          if (!value) {
            throw new InvalidRomanNumeralError(roman, `Invalid character '${roman[i]}'`);
          }
          result += value;
        }
        return result;
      }
      ```
    - **Step 1.5:** Create main export `src/index.ts`
      ```typescript
      import { convert } from './roman-numerals/domain/roman-converter';
      
      export function romanToNumber(input: string): number {
        return convert(input);
      }
      ```
    - **Validation:** Run `npm test` - MUST show 7 passing tests
    - **Checkpoint:** Single symbols I,V,X,L,C,D,M all convert correctly
  - [ ] Task 2: Additive notation support
    - **Action:** Add to `test/roman-numerals/roman-converter.test.ts` (before test.run()):
      ```typescript
      // Add these tests after the single symbol tests
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
    - **Note:** No code changes needed! The Task 1 implementation already handles addition
    - **Validation:** Run `npm test` - MUST show 17 passing tests
    - **Checkpoint:** II=2, III=3, VI=6, etc. all working
  - [ ] Task 3: Subtractive notation and complex numbers
    - **Step 3.1:** Add tests to `test/roman-numerals/roman-converter.test.ts`:
      ```typescript
      // Add after additive tests, before test.run()
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
    - **Step 3.2:** Update `src/roman-numerals/domain/roman-converter.ts`:
      ```typescript
      import { InvalidRomanNumeralError } from '../types';
      
      const symbolValues = new Map<string, number>([
        ['I', 1], ['V', 5], ['X', 10], ['L', 50], 
        ['C', 100], ['D', 500], ['M', 1000]
      ]);
      
      const subtractivePatterns = new Map<string, number>([
        ['IV', 4], ['IX', 9], ['XL', 40], 
        ['XC', 90], ['CD', 400], ['CM', 900]
      ]);
      
      export function convert(roman: string): number {
        let result = 0;
        let i = 0;
        
        while (i < roman.length) {
          // Check two-character pattern first
          if (i + 1 < roman.length) {
            const twoChar = roman.substring(i, i + 2);
            if (subtractivePatterns.has(twoChar)) {
              result += subtractivePatterns.get(twoChar)!;
              i += 2;
              continue;
            }
          }
          
          // Single character
          const oneChar = roman[i];
          const value = symbolValues.get(oneChar);
          if (!value) {
            throw new InvalidRomanNumeralError(roman, `Invalid character '${oneChar}'`);
          }
          result += value;
          i++;
        }
        
        return result;
      }
      ```
    - **Validation:** Run `npm test` - MUST show 28 passing tests
    - **Quick test:** `npx tsx -e "import {romanToNumber} from './src/index'; console.log(romanToNumber('MCMXCIV'))"` should print 1994
    - **Checkpoint:** IV=4, IX=9, MCMXCIV=1994 all working
  - [ ] Task 4: Input validation and error handling
    - **Step 4.1:** Create `src/roman-numerals/validation.ts`:
      ```typescript
      import { InvalidRomanNumeralError } from './types';
      
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
    - **Step 4.2:** Update `src/index.ts` to add validation:
      ```typescript
      import { convert } from './roman-numerals/domain/roman-converter';
      import { validateRomanNumeral } from './roman-numerals/validation';
      
      export function romanToNumber(input: string): number {
        const normalized = input.toUpperCase();
        validateRomanNumeral(normalized);
        return convert(normalized);
      }
      ```
    - **Step 4.3:** Add error tests to `test/roman-numerals/roman-converter.test.ts`:
      ```typescript
      // Add after complex tests, before test.run()
      test('throws on empty string', () => {
        assert.throws(() => romanToNumber(''), /Invalid roman numeral/);
      });
      test('throws on invalid chars', () => {
        assert.throws(() => romanToNumber('ABC'), /Invalid/);
      });
      test('throws on IIII', () => {
        assert.throws(() => romanToNumber('IIII'), /Invalid sequence/);
      });
      test('throws on VV', () => {
        assert.throws(() => romanToNumber('VV'), /Invalid sequence/);
      });
      test('handles lowercase', () => {
        assert.is(romanToNumber('xiv'), 14);
      });
      ```
    - **Validation Commands:**
      1. `npm test` - All 33+ tests must pass
      2. `npm run lint` - Zero errors
      3. `npm run test:ts` - TypeScript compiles cleanly
    - **Checkpoint:** Full implementation complete with validation
  - [ ] Task 5: Final quality check
    - **Step 5.1:** Run all validation commands:
      ```bash
      npm test          # All 33+ tests should pass
      npm run lint      # Should show 0 errors
      npm run test:ts   # Should compile without errors
      ```
    - **Step 5.2:** Verify core functionality:
      ```bash
      # Test the main function
      npx tsx -e "import {romanToNumber} from './src/index'; console.log(romanToNumber('MCMXCIV'))"
      # Should output: 1994
      ```
    - **Step 5.3:** Fix any issues found:
      - Lint errors: Run `npm run cleanup` to auto-fix
      - Type errors: Check return types and imports
      - Test failures: Review implementation against test expectations
    - **Success Criteria:** 
      - ✅ All tests passing (33+ tests)
      - ✅ Zero lint errors
      - ✅ Zero TypeScript errors
      - ✅ romanToNumber('MCMXCIV') returns 1994
      - ✅ romanToNumber('') throws InvalidRomanNumeralError
      - ✅ romanToNumber('xiv') returns 14 (lowercase handling)

## Critical Success Factors

### Must Follow
- **TDD Approach:** Always write tests before implementation
- **Incremental Progress:** Each task must end with all tests passing
- **No External Libraries:** Build everything from scratch
- **TypeScript Strict:** All functions need explicit return types
- **uvu Only:** Never use jest, vitest, or other test frameworks

### Common Pitfalls to Avoid
- **Wrong test imports:** Use `import { test } from 'uvu'` not jest
- **Missing test.run():** Must have `test.run()` at end of test file
- **Relative imports:** Use `'../../src/index'` from test files
- **Forgetting exports:** Every function must be exported
- **Type errors:** Run `npm run test:ts` to catch early

## Quick Reference Commands
```bash
# During development
npm test                # Run all tests
npm run lint            # Check for lint errors
npm run test:ts         # Check TypeScript compilation
npm run cleanup         # Auto-fix lint issues

# Quick function test
npx tsx -e "import {romanToNumber} from './src/index'; console.log(romanToNumber('XIV'))"
```