const {
    Subject,
    AsyncSubject
} = require('rxjs');


console.clear();

let counter = 0;
let asyncCounter = 0;

let source$ = new Subject();
let asyncSource$ = new AsyncSubject();


const sourceAsObservable = () => {
    let counter = 0;
    let source$ = new Subject();

    setInterval(() => {
        if (counter < 3) {
            source$.next(counter++);
            return;
        }
        source$.complete();
    }, 1000);

    return source$.asObservable();
};

setTimeout(() => {
    source$.next(counter++);
}, 1000);

setInterval(() => {
    if (asyncCounter < 3) {
        asyncSource$.next(asyncCounter++);
        return;
    }
    asyncSource$.complete();
}, 1000);


//source$.subscribe(console.log);
//asyncSource$.subscribe(console.log);

sourceAsObservable().subscribe(console.log);