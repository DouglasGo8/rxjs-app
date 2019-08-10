const { timer, interval } = require("rxjs");
const { buffer } = require("rxjs/operators");


const source$ =  timer(0, 1000);
const closingNotifier$ = interval(3000);



const buffered$ = source$.pipe(buffer(closingNotifier$));


buffered$.subscribe(console.log);