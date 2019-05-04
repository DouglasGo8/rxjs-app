const {
    pipe,
    range
} = require('rxjs');
const {
    filter,
    map
} = require('rxjs/Operators');

const operators = pipe(
    map(x => x * 2),
    filter(x => x > 5)
);

const source$ = range(0, 10);

source$
    .pipe(operators)
    .subscribe(console.log, console.error);