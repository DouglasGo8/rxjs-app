const emitter = require("events").EventEmitter;
const $buttonEmmiter = new emitter();
const { fromEvent, interval } = require("rxjs");
const {
  switchMapTo,
  startWith,
  scan,
  takeWhile,
  finalize
} = require("rxjs/operators");

console.clear();
const COUNTDOWN_TIME = 10;

const countDown$ = interval(1000).pipe(
  scan((acc, _) => --acc, COUNTDOWN_TIME),
  startWith(COUNTDOWN_TIME)
);

fromEvent($buttonEmmiter, "click")
  .pipe(
    switchMapTo(countDown$),
    takeWhile(val => val >= 0),
    finalize(() => {return "Done"})
  )
  .subscribe(console.log);

$buttonEmmiter.emit("click", "");
