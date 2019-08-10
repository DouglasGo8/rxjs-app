const { from } = require("rxjs");
const { scan, map } = require("rxjs/operators");

console.clear();

from([1, 2, 3, 4, 5])
  .pipe(
    scan((acc, next) => acc + next, 0),
    map((x, i) => x / (i + 1))
  )
  .subscribe(console.log);
