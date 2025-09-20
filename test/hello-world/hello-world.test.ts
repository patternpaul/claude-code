import { test } from "uvu";
import * as assert from "uvu/assert";

test("HELLO WORLD", () => {
  const message = "HELLO WORLD";
  assert.is(message, "HELLO WORLD");
});

test.run();
