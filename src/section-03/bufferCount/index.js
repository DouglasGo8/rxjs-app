const { timer } = require("rxjs");
const { bufferCount } = require("rxjs/operators");

const sourceInterval$ = timer(0, 1000);

console.clear();

/**
 * @author dbatista
 */
const buffered$ = sourceInterval$.pipe(
  bufferCount(2, 2),
  bufferCount(3, 2),
  bufferCount(2, 3)
);

buffered$.subscribe(console.log);
