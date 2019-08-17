const { interval } = require("rxjs");
const { take } = require("rxjs/operators");

interval(1000)
  .pipe(take(4))
  .subscribe(console.log);
