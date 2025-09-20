export function romanToNumber(input: string): number {
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

  for (let i = 0; i < input.length; i++) {
    const currentValue = symbolValues.get(input[i]);

    if (currentValue === undefined) {
      throw new Error(`Invalid Roman numeral character: ${input[i]}`);
    }

    total += currentValue;
  }

  return total;
}
