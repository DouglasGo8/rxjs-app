const {
    interval
} = require('rxjs');
const {
    take,
    publishReplay
} = require('rxjs/Operators');


const source$ = interval(1000).pipe(take(2), publishReplay(3));


source$.connect();


source$.subscribe(console.log);

setTimeout(() => {
    source$.subscribe(console.log);
}, 2500);