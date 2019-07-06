

const {of, from} = require('rxjs');


let $source1 = of([1, 2], 3);
let $source2 = of([1, 2]);
let $source3 = of(Promise.resolve(4));
let $source4 = from(of(4));

$source1.subscribe(console.log);
$source2.subscribe(console.log);
$source3.subscribe(console.log);


let subs = $source4.subscribe(console.log);

setTimeout(function () {
  subs.unsubscribe();
}, 5000);
