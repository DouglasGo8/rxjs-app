const {
  timer
} = require("rxjs");


source = timer(0, 1000);

source.subscribe(console.log);
