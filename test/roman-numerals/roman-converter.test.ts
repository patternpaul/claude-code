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

test.run();