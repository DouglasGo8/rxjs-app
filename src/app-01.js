// This is your Editor pane. Write your JavaScript here and 
// use the command line to execute commands

console.clear();

const {defer, of, interval, Observable} = require('rxjs');
const {switchMap, take} = require('rxjs/operators');

const ofFactory = (n) => {
  return of(n);
}

const mapCondition = (data) => {
  if ((data % 2) === 0)
    return of("even")
  else
    return of("odd")
}

let counter = 0;
let source$ = defer(()=> ofFactory(counter++));
// Observable.create((sub)=> { setInterval(()=>{sub.next('hi')}, 1000) }).subscribe(console.log);

source$.subscribe(console.log);
source$.subscribe(console.log);

of(12)
  .pipe(switchMap(mapCondition))
  .subscribe(console.log);
  
interval(1000)
  .pipe(take(10))
  .subscribe(console.log);
