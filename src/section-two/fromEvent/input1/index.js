const emitter = require('events').EventEmitter;
const $inputEmmiter = new emitter();

const {fromEvent} = require('rxjs');
const {debounceTime} = require('rxjs/operators');

/*$inputEmmiter.on('myInputEvent', (data) => {
  console.log(data);
});*/

fromEvent($inputEmmiter, 'keyup')
  .pipe(debounceTime(750)) // can't be greater than interval time
  .subscribe(console.log);


setInterval(() => {
  $inputEmmiter.emit('keyup', Math.floor(Math.random() * Math.floor(60)));
}, 1000);
