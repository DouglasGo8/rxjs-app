const { interval } = require("rxjs");
const { bufferToggle } = require("rxjs/operators");

const sourceInterval$ = interval(1000); //emit value every second
const startInterval$ = interval(5000); //emit value every 5 seconds
const closingInterval = (val) => interval(3000); //emit value after 3s

const buffered$ = sourceInterval$.pipe(bufferToggle(startInterval$, closingInterval));

buffered$.subscribe(console.log);