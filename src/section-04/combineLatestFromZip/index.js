const { of, combineLatest } = require("rxjs");
const { delay, startWith } = require("rxjs/operators");

const observables = [1, 5, 10].map(n => of(n).pipe(delay(n * 1000), startWith(0)));

combineLatest(observables).subscribe(console.log);
