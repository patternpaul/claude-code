import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { romanToNumber } from '../../src/index';

test('converts I to 1', () => {
  assert.is(romanToNumber('I'), 1);
});

test('converts V to 5', () => {
  assert.is(romanToNumber('V'), 5);
});

test('converts X to 10', () => {
  assert.is(romanToNumber('X'), 10);
});

test('converts L to 50', () => {
  assert.is(romanToNumber('L'), 50);
});

test('converts C to 100', () => {
  assert.is(romanToNumber('C'), 100);
});

test('converts D to 500', () => {
  assert.is(romanToNumber('D'), 500);
});

test('converts M to 1000', () => {
  assert.is(romanToNumber('M'), 1000);
});

// Additive notation tests
test('converts II to 2', () => {
  assert.is(romanToNumber('II'), 2);
});

test('converts III to 3', () => {
  assert.is(romanToNumber('III'), 3);
});

test('converts VI to 6', () => {
  assert.is(romanToNumber('VI'), 6);
});

test('converts VII to 7', () => {
  assert.is(romanToNumber('VII'), 7);
});

test('converts VIII to 8', () => {
  assert.is(romanToNumber('VIII'), 8);
});

test('converts XI to 11', () => {
  assert.is(romanToNumber('XI'), 11);
});

test('converts XV to 15', () => {
  assert.is(romanToNumber('XV'), 15);
});

test('converts XX to 20', () => {
  assert.is(romanToNumber('XX'), 20);
});

test('converts XXX to 30', () => {
  assert.is(romanToNumber('XXX'), 30);
});

test('converts LX to 60', () => {
  assert.is(romanToNumber('LX'), 60);
});

// Subtractive notation tests
test('converts IV to 4', () => {
  assert.is(romanToNumber('IV'), 4);
});

test('converts IX to 9', () => {
  assert.is(romanToNumber('IX'), 9);
});

test('converts XL to 40', () => {
  assert.is(romanToNumber('XL'), 40);
});

test('converts XC to 90', () => {
  assert.is(romanToNumber('XC'), 90);
});

test('converts CD to 400', () => {
  assert.is(romanToNumber('CD'), 400);
});

test('converts CM to 900', () => {
  assert.is(romanToNumber('CM'), 900);
});

// Complex number tests
test('converts XIV to 14', () => {
  assert.is(romanToNumber('XIV'), 14);
});

test('converts XLII to 42', () => {
  assert.is(romanToNumber('XLII'), 42);
});

test('converts MCMXCIV to 1994', () => {
  assert.is(romanToNumber('MCMXCIV'), 1994);
});

test('converts MMXXIII to 2023', () => {
  assert.is(romanToNumber('MMXXIII'), 2023);
});

test('converts MMMCMXCIX to 3999', () => {
  assert.is(romanToNumber('MMMCMXCIX'), 3999);
});

test.run();