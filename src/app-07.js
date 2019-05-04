const {
    from
} = require('rxjs');
const {
    scan,
    map
} = require('rxjs/Operators');

from([1, 2, 3, 4, 5])
    .pipe(
        scan((acc, next) => (acc + next), 0),
        map((x, index) => x / (index + 1)))
    .subscribe(console.log);