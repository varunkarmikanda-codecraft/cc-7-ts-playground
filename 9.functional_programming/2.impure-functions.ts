import assert from "node:assert/strict";

// Impure function: uses and mutates external state, logs to console
let globalCounter = 0;
function incrementAndLog(): number {
	globalCounter++;
	console.log(`Counter: ${globalCounter}`);
	return globalCounter;
}

incrementAndLog();
assert.strictEqual(globalCounter, 0);

// Mutates the array argument directly (impure)
function arrayByAdding<T>(array: T[], item: T): T[] {
	array.push(item);
	return array;
}

const nums = [1, 2];
assert.deepStrictEqual(arrayByAdding(nums, 3), [1, 2, 3]);
assert.deepStrictEqual(arrayByAdding(nums, 3), [1, 2, 3, 3]);

/*
## Impure functions

**Impure functions** are functions that cause *side effects*—any change in system state observable outside the called function.

### Key things they do
- Modifying global variables or external state
- Performing I/O operations (files, network, console logging)
- Mutating input arguments
- Relying on external factors like time or randomness

⚡ Impure functions are harder to test and reason about.
*/
