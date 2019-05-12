

const { interval, combineLatest } = require('rxjs');
const { map, take } = require('rxjs/Operators');


console.clear();


let counter1 = 0;
let counter2 = 10;

const observable1$ = interval(800).pipe(
    map(() => {
        console.log('Source1:', counter1);
        return counter1++
    }), take(2)
)


const observable2$ = interval(1000).pipe(
    map(() => {
        console.log('Source2:', counter2);
        return counter2++
    }), take(2)
)



combineLatest(observable1$, observable2$)
    .subscribe(console.log);
