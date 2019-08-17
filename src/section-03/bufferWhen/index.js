const { timer, interval } = require("rxjs");
const { bufferWhen } = require("rxjs/operators");

const sourceInterval$ = timer(0, 1000);
const closingNotifier$ = interval(3000);

console.clear();

buffered$ = sourceInterval$.pipe(
  bufferWhen(() => {
    console.log("Call factory function");
    return closingNotifier$;
  })
);

buffered$.subscribe(console.log);
