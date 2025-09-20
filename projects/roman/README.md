# Roman Numerals Converter

## Project Overview
TypeScript function that converts roman numeral strings to their numerical values.

## Architecture
```
src/
├── index.ts                    # Main export: romanToNumber()
└── roman-numerals/
    ├── domain/
    │   └── roman-converter.ts  # Core conversion logic
    ├── types.ts                # Type definitions
    └── validation.ts           # Input validation

test/
└── roman-numerals/
    └── roman-converter.test.ts # Test suite using uvu
```

## Implementation Context

### Core Algorithm
1. Map roman symbols to values: I=1, V=5, X=10, L=50, C=100, D=500, M=1000
2. Process string left-to-right with look-ahead
3. Check for two-character subtractive patterns first (IV, IX, XL, XC, CD, CM)
4. Fall back to single character values
5. Sum all values

### Key Patterns
- Use Map<string, number> for O(1) symbol lookups
- Separate validation pass before conversion
- TypeScript strict mode with explicit return types
- Pure functions, no side effects
- Specific error classes for different failure modes

### Test Coverage Requirements
- Single symbols: I, V, X, L, C, D, M
- Additive notation: II, III, VI, XX
- Subtractive notation: IV, IX, XL, XC, CD, CM
- Complex numbers: XIV (14), MCMXCIV (1994)
- Edge cases: empty string, invalid characters, invalid sequences
- Case handling: accept uppercase, handle lowercase gracefully

### Validation Rules
- Only valid roman characters allowed: I, V, X, L, C, D, M
- No more than 3 consecutive identical symbols (except M)
- V, L, D cannot be repeated
- Subtractive pairs must be valid (IV, IX, XL, XC, CD, CM)

## Current Status
Project initialized. No implementation yet. Ready for TDD development.
