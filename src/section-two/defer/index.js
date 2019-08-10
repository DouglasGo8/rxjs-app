const {
  of , defer
} = require("rxjs");

const factoryOf = n => of (n);

let counter = 0;

let source$ = defer(() => factoryOf(counter++));

source$.subscribe((data) => console.log('1: ', data));
source$.subscribe((data) => console.log('2: ', data));
