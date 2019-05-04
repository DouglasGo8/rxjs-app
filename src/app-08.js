

const {interval} = require('rxjs');
const {bufferCount} = require('rxjs/Operators');


interval(1000)
    .pipe(bufferCount(2,2))
    .subscribe(console.log);
