# Roman Numerals Converter

## Project Status
**Implementation:** Not started (0% complete)  
**Next Task:** Create test infrastructure with first failing test  
**Validation Commands:** `npm test` (should see 1 failing test after setup)

## Architecture
```
src/
├── index.ts                    # Export: export function romanToNumber(input: string): number
└── roman-numerals/
    ├── domain/
    │   └── roman-converter.ts  # export function convert(roman: string): number
    ├── types.ts                # RomanSymbol type, InvalidRomanNumeralError class
    └── validation.ts           # export function validateRomanNumeral(input: string): void

test/
└── roman-numerals/
    └── roman-converter.test.ts # import { test } from 'uvu'
```

## Implementation Patterns

### Symbol Mapping (copy-paste ready)
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

### Conversion Algorithm
```typescript
function convert(roman: string): number {
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
    if (!symbolValues.has(oneChar)) {
      throw new InvalidRomanNumeralError(roman, `Invalid character '${oneChar}'`);
    }
    result += symbolValues.get(oneChar)!;
    i++;
  }
  
  return result;
}
```

## Validation Rules Implementation
- **Valid chars only:** /^[IVXLCDM]+$/
- **No 4+ consecutive:** /(I{4,}|X{4,}|C{4,})/
- **No doubles of V,L,D:** /(VV|LL|DD)/
- **Valid sequences:** Check invalid patterns like IIV, IIX, etc.

## Test Data Reference
```
Single: I=1, V=5, X=10, L=50, C=100, D=500, M=1000
Additive: II=2, III=3, VI=6, VII=7, VIII=8, XI=11, XX=20, XXX=30
Subtractive: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900
Complex: XIV=14, XLII=42, MCMXCIV=1994, MMXXIII=2023, MMMCMXCIX=3999
Edge: ""=error, "ABC"=error, "IIII"=error, "VV"=error
```

## Dependencies
- TypeScript (strict mode enabled)
- uvu test framework (already in package.json)
- No external roman numeral libraries

## Critical Implementation Notes
1. Main export must be named `romanToNumber` in src/index.ts
2. Handle both uppercase and lowercase input (convert to upper)
3. Empty string should throw InvalidRomanNumeralError
4. All tests must use uvu, not jest
5. Use explicit return types on all functions
6. Wrap all error-throwing code in proper TypeScript types