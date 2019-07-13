const { interval } = require("rxjs");
const { take, publishReplay } = require("rxjs/operators");

/*let source$ = interval(1000).pipe(
  take(3),
  publish()
);*/

let source$ = interval(1000).pipe(
  take(3),
  publishReplay(3)
);

source$.connect();

source$.subscribe(console.log);

setTimeout(() => {
  source$.subscribe(console.log);
}, 2500);
